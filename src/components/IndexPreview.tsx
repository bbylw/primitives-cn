/**
 * 首屏的签名动作：指向索引的某一行，右侧那一格就换成那个组件的真实运行界面。
 * 没有 JavaScript 时右侧显示组件静态实例，内容不缺。
 */
import { useState } from 'react';
import { Accordion, Dialog, Select, Switch, Tabs, Tooltip, Slider } from 'radix-ui';

type PreviewId = 'Accordion' | 'Dialog' | 'Select' | 'Switch' | 'Tabs' | 'Tooltip' | 'Slider';

/** 首屏每一行索引各自对应的真实组件 */
export const PREVIEW_FOR: Record<string, PreviewId> = {
  '概述': 'Accordion',
  '无障碍': 'Switch',
  '无样式': 'Tabs',
  '开放': 'Dialog',
  '非受控': 'Slider',
  '渐进采用': 'Select',
  '组件索引': 'Tooltip',
  '社区': 'Accordion',
};

function Preview({ id }: { id: PreviewId }) {
  switch (id) {
    case 'Accordion':
      return (
        <Accordion.Root type="single" collapsible defaultValue="a" className="px-accordion">
          <Accordion.Item value="a" className="px-accordion-item">
            <Accordion.Header className="px-accordion-header">
              <Accordion.Trigger className="px-accordion-trigger">八个章节</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="px-accordion-content">
              每个章节都对应这个组件的一项能力。
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="b" className="px-accordion-item">
            <Accordion.Header className="px-accordion-header">
              <Accordion.Trigger className="px-accordion-trigger">真实部件</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="px-accordion-content">
              Root、Item、Header、Trigger、Content，五个。
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      );
    case 'Dialog':
      return (
        <Dialog.Root>
          <Dialog.Trigger className="px-btn">八个部件的对话框</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="px-overlay" />
            <Dialog.Content className="px-dialog">
              <Dialog.Title className="px-dialog-title">Root 到 Close</Dialog.Title>
              <Dialog.Description className="px-dialog-desc">
                焦点被锁在这里，Esc 或点击外部可关闭。
              </Dialog.Description>
              <Dialog.Close className="px-btn px-btn-solid">知道了</Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      );
    case 'Select':
      return (
        <Select.Root defaultValue="all">
          <Select.Trigger className="px-select-trigger" aria-label="安装方式">
            <Select.Value />
            <Select.Icon className="px-select-icon">
              <svg width="10" height="7" viewBox="0 0 10 7" aria-hidden="true">
                <path d="M1 1.4 5 5.4 9 1.4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="px-select-content" position="popper" sideOffset={6}>
              <Select.Viewport className="px-select-viewport">
                <Select.Item className="px-select-item" value="all">
                  <Select.ItemText>聚合包</Select.ItemText>
                </Select.Item>
                <Select.Item className="px-select-item" value="one">
                  <Select.ItemText>单独安装</Select.ItemText>
                </Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      );
    case 'Switch':
      return (
        <div className="px-row">
          <Switch.Root defaultChecked className="a11y-switch" aria-label="自动更新" id="pv-switch">
            <Switch.Thumb className="a11y-switch-thumb" />
          </Switch.Root>
          <span className="small">aria-checked 随状态变化</span>
        </div>
      );
    case 'Tabs':
      return (
        <Tabs.Root defaultValue="a" className="px-tabs">
          <Tabs.List className="px-tabs-list" aria-label="样式方案">
            <Tabs.Trigger className="px-tab" value="a">Tailwind</Tabs.Trigger>
            <Tabs.Trigger className="px-tab" value="b">CSS Modules</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className="px-tabpanel" value="a">
            组件不带样式，类名由你决定。
          </Tabs.Content>
          <Tabs.Content className="px-tabpanel" value="b">
            换成任何方案都可以。
          </Tabs.Content>
        </Tabs.Root>
      );
    case 'Tooltip':
      return (
        <Tooltip.Provider delayDuration={200}>
          <Tooltip.Root>
            <Tooltip.Trigger className="px-btn px-btn-linklike">指向或聚焦这里</Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className="px-tooltip" sideOffset={6}>
                提示不能包含可交互元素
                <Tooltip.Arrow className="px-tooltip-arrow" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      );
    case 'Slider':
      return (
        <div className="px-slider-wrap">
          <Slider.Root defaultValue={[45]} max={100} className="px-slider" aria-label="示例数值">
            <Slider.Track className="px-slider-track">
              <Slider.Range className="px-slider-range" />
            </Slider.Track>
            <Slider.Thumb className="px-slider-thumb" />
          </Slider.Root>
        </div>
      );
  }
}

export default function IndexPreview({ names }: { names: string[] }) {
  const initial = PREVIEW_FOR[names[0] ?? ''] ?? 'Accordion';
  const [active, setActive] = useState<PreviewId>(initial);

  return (
    <div className="idx-preview" data-ui>
      <div className="idx-preview-stage" key={active}>
        <Preview id={active} />
      </div>
      <div className="idx-preview-caption">
        {names.indexOf(
          Object.keys(PREVIEW_FOR).find((k) => PREVIEW_FOR[k] === active) ?? '',
        ) >= 0 && <span className="idx-preview-name">{active}</span>}
        <span className="idx-preview-note">真实运行的组件，指向上方任一行可切换</span>
      </div>
      <div className="idx-preview-tabs" role="group" aria-label="切换预览组件">
        {names.map((n) => {
          const id = PREVIEW_FOR[n];
          if (!id) return null;
          return (
            <button
              key={n}
              type="button"
              className="idx-preview-tab"
              aria-pressed={active === id}
              onMouseEnter={() => setActive(id)}
              onFocus={() => setActive(id)}
              onClick={() => setActive(id)}
            >
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );
}