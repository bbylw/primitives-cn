/**
 * 实时无障碍解剖台。本站唯一需要动手的东西。
 *
 * 它渲染真实的 Radix 组件（不是截图，不是仿制），然后把浏览器 DOM 上
 * 真正存在的 role / aria-* / data-* 读出来展示。读者按 Tab 键走一遍，
 * 就能看见焦点如何被组件接管。
 */
import { useEffect, useRef, useState } from 'react';
import { Switch, Slider, Tabs } from 'radix-ui';

type AttrRow = { name: string; value: string };

type Panel = {
  id: string;
  label: string;
  zh: string;
  render: () => React.ReactNode;
  /** 引导语：这个组件该看什么 */
  hint: string;
};

function PanelSurface({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        alignItems: 'flex-start',
        padding: '1.5rem',
        width: '100%',
      }}
    >
      {children}
    </div>
  );
}

const PANELS: Panel[] = [
  {
    id: 'switch',
    label: 'Switch',
    zh: '开关',
    hint: '按 Tab 聚焦它，再按空格。看 role 与 aria-checked 随状态一起变。',
    render: () => (
      <PanelSurface>
        <Switch.Root
          className="a11y-switch"
          defaultChecked
          aria-label="自动更新"
          id="a11y-switch-demo"
        >
          <Switch.Thumb className="a11y-switch-thumb" />
        </Switch.Root>
      </PanelSurface>
    ),
  },
  {
    id: 'tabs',
    label: 'Tabs',
    zh: '标签页',
    hint: '每个标签是 role="tab"，面板是 role="tabpanel"，aria-selected 标出当前项。',
    render: () => (
      <Tabs.Root defaultValue="over" className="a11y-tabs">
        <Tabs.List className="a11y-tabs-list" aria-label="示例面板">
          <Tabs.Trigger className="a11y-tab" value="over">
            概览
          </Tabs.Trigger>
          <Tabs.Trigger className="a11y-tab" value="parts">
            部件
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="a11y-tabpanel" value="over">
          概览面板的内容。
        </Tabs.Content>
        <Tabs.Content className="a11y-tabpanel" value="parts">
          部件面板的内容。
        </Tabs.Content>
      </Tabs.Root>
    ),
  },
  {
    id: 'slider',
    label: 'Slider',
    zh: '滑块',
    hint: '每个 Thumb 都是 role="slider"，aria-valuenow 带着当前数值。',
    render: () => (
      <PanelSurface>
        <Slider.Root defaultValue={[40]} max={100} className="a11y-slider" aria-label="音量">
          <Slider.Track className="a11y-slider-track">
            <Slider.Range className="a11y-slider-range" />
          </Slider.Track>
          <Slider.Thumb className="a11y-slider-thumb" />
        </Slider.Root>
      </PanelSurface>
    ),
  },
];

function readAttributes(el: Element | null): AttrRow[] {
  if (!el) return [];
  const out: AttrRow[] = [];
  const take = (n: string) => {
    const v = el.getAttribute(n);
    if (v !== null && v !== '') out.push({ name: n, value: v });
  };
  if (el.getAttribute('role')) out.push({ name: 'role', value: el.getAttribute('role')! });
  ['aria-label', 'aria-checked', 'aria-selected', 'aria-valuenow', 'aria-valuemin', 'aria-valuemax', 'aria-orientation', 'aria-controls', 'aria-labelledby'].forEach(take);
  ['data-state', 'data-disabled', 'data-orientation', 'data-value'].forEach(take);
  const tag = el.tagName.toLowerCase();
  out.unshift({ name: 'element', value: tag });
  return out;
}

export default function A11yBench() {
  const [panelId, setPanelId] = useState(PANELS[0]!.id);
  const [rows, setRows] = useState<AttrRow[]>([]);
  const [target, setTarget] = useState<string>('');
  const surfaceRef = useRef<HTMLDivElement>(null);
  const panel = PANELS.find((p) => p.id === panelId) ?? PANELS[0]!;

  // 监听真实焦点与真实状态变化，把 DOM 上确实存在的属性读出来
  useEffect(() => {
    const root = surfaceRef.current;
    if (!root) return;

    const read = () => {
      const active = document.activeElement;
      const inPanel = active instanceof Element && root.contains(active);
      if (inPanel) {
        setTarget(describe(active));
        setRows(readAttributes(active));
        return;
      }
      // 还没聚焦到任何元素时，先展示探针里第一个带语义的元素，
      // 让读数一开始就有内容，而不是一片空白。
      const probe = root.querySelector('[data-probe]');
      const meaningful = probe?.querySelector<HTMLElement>(
        '[role], [aria-checked], [aria-selected], [aria-valuenow], button, [data-state]',
      );
      const target = meaningful ?? probe;
      setTarget(target ? describe(target) : '');
      setRows(readAttributes(target));
    };

    read();
    const observer = new MutationObserver(read);
    observer.observe(root, {
      subtree: true,
      attributes: true,
      attributeFilter: ['role', 'aria-checked', 'aria-selected', 'aria-valuenow', 'data-state', 'data-disabled', 'data-value', 'aria-orientation'],
    });
    root.addEventListener('focusin', read);
    root.addEventListener('focusout', read);
    const pointer = (e: Event) => {
      if (e.target instanceof Element && root.contains(e.target)) {
        setTarget(describe(e.target));
        setRows(readAttributes(e.target));
      }
    };
    root.addEventListener('click', pointer);
    return () => {
      observer.disconnect();
      root.removeEventListener('focusin', read);
      root.removeEventListener('focusout', read);
      root.removeEventListener('click', pointer);
    };
  }, [panelId]);

  return (
    <div className="a11y-bench" data-ui>
      <div className="a11y-bench-controls" role="tablist" aria-label="选择要解剖的组件">
        {PANELS.map((p) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={panelId === p.id}
            className="a11y-bench-tab"
            onClick={() => setPanelId(p.id)}
          >
            <span className="a11y-bench-tab-zh">{p.zh}</span>
            <span className="a11y-bench-tab-en">{p.label}</span>
          </button>
        ))}
      </div>

      <div className="a11y-bench-body">
        <div className="a11y-bench-surface" ref={surfaceRef}>
          <div data-probe="" className="a11y-bench-probe">
            {panel.render()}
          </div>
          <p className="a11y-bench-hint">{panel.hint}</p>
        </div>

        <div className="a11y-bench-read" aria-live="polite">
          <p className="a11y-bench-read-title">
            {target ? `焦点在 ${target}` : '按 Tab 键进入这一侧，读数会跟着走'}
          </p>
          {rows.length > 0 && (
            <p className="a11y-bench-read-hint">按 Tab 键在组件内部移动，读数会跟着焦点走。</p>
          )}
          {rows.length > 0 ? (
            <dl className="a11y-attrs">
              {rows.map((r) => (
                <div className="a11y-attr" key={r.name}>
                  <dt><code>{r.name}</code></dt>
                  <dd><code>{r.value}</code></dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="a11y-bench-empty">还没有聚焦到任何元素。</p>
          )}
        </div>
      </div>
    </div>
  );
}

function describe(el: Element): string {
  const cls = el.getAttribute('class');
  const base = el.tagName.toLowerCase();
  const role = el.getAttribute('role');
  if (role) return `${base}[role=${role}]`;
  if (cls) return `${base}.${cls.split(/\s+/)[0]}`;
  return base;
}