/**
 * v4 官方风组件演示网格：8 卡真实 Radix 组件，全部可操作。
 * 与落地页 / hero 共用；全部是 radix-ui@1.8.1 的真实部件。
 */
import { useState } from 'react';
import { Avatar, Checkbox, Progress, RadioGroup, Slider, Switch, Tabs, Tooltip, ToggleGroup } from 'radix-ui';

/* ---------- 单卡壳 ---------- */
function Card({ nm, children, foot, wide }: { nm: string; children: React.ReactNode; foot: string; wide?: boolean }) {
  return (
    <div className={'dcard' + (wide ? ' wide' : '')} data-ui>
      <span className="nm">{nm}</span>
      <div className="stage">{children}</div>
      <span className="foot-note">{foot}</span>
    </div>
  );
}

/* ---------- 各卡 ---------- */
function SwitchCard() {
  const [on, setOn] = useState(true);
  return (
    <Card nm="Switch" foot={'role="switch" · aria-checked 随状态变化'}>
      <div className="p-row">
        <Switch.Root className="px-switch" checked={on} onCheckedChange={setOn} aria-label="深色模式" id="dg-sw">
          <Switch.Thumb className="px-switch-thumb" />
        </Switch.Root>
        <span style={{ fontSize: 14 }}>深色模式</span>
        <code className="dg-read">aria-checked="{String(on)}"</code>
      </div>
    </Card>
  );
}

function SliderCard() {
  const [v, setV] = useState([38]);
  return (
    <Card nm="Slider" foot="aria-valuenow 随拖动与方向键更新">
      <div className="dg-slider">
        <Slider.Root
          className="px-slider"
          value={v}
          onValueChange={setV}
          max={100}
          step={1}
          id="dg-slider"
        >
          <Slider.Track className="px-slider-track">
            <Slider.Range className="px-slider-range" />
          </Slider.Track>
          <Slider.Thumb className="px-slider-thumb" aria-label="音量" />
        </Slider.Root>
        <span className="small nums">
          aria-valuenow = <b>{v[0]}</b> · 支持方向键
        </span>
      </div>
    </Card>
  );
}

function CheckboxCard() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  return (
    <Card nm="Checkbox" foot="aria-checked 双态，键盘空格可切">
      <div className="dg-col">
        <label className="px-check-label" htmlFor="dg-ck1">
          <Checkbox.Root className="px-checkbox" id="dg-ck1" checked={a} onCheckedChange={(c) => setA(c === true)}>
            <Checkbox.Indicator className="px-checkbox-indicator" />
          </Checkbox.Root>
          包含未读邮件
        </label>
        <label className="px-check-label" htmlFor="dg-ck2">
          <Checkbox.Root className="px-checkbox" id="dg-ck2" checked={b} onCheckedChange={(c) => setB(c === true)}>
            <Checkbox.Indicator className="px-checkbox-indicator" />
          </Checkbox.Root>
          标记为重要
        </label>
      </div>
    </Card>
  );
}

function RadioCard() {
  const [v, setV] = useState('标准');
  return (
    <Card nm="RadioGroup" foot="roving focus · 方向键循环">
      <RadioGroup.Root className="px-radiogroup" value={v} onValueChange={setV} aria-label="密度" id="dg-radio">
        {['紧凑', '标准', '宽松'].map((x) => (
          <span className="px-radio-item" key={x}>
            <RadioGroup.Item className="px-radio" value={x} id={'dg-r-' + x}>
              <RadioGroup.Indicator className="px-radio-dot" />
            </RadioGroup.Item>
            <label htmlFor={'dg-r-' + x}>{x}</label>
          </span>
        ))}
      </RadioGroup.Root>
    </Card>
  );
}

function TabsCard() {
  return (
    <Card nm="Tabs" foot="role=tablist · aria-selected 标出当前项" wide>
      <Tabs.Root defaultValue="a" className="px-tabs">
        <Tabs.List className="px-tabs-list" aria-label="示例">
          <Tabs.Trigger className="px-tab" value="a">无障碍</Tabs.Trigger>
          <Tabs.Trigger className="px-tab" value="b">无样式</Tabs.Trigger>
          <Tabs.Trigger className="px-tab" value="c">开放</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="px-tabpanel" value="a">焦点管理、键盘导航在内部完成，遵循 WAI-ARIA。</Tabs.Content>
        <Tabs.Content className="px-tabpanel" value="b">渲染真实 DOM，类名完全由你的样式方案决定。</Tabs.Content>
        <Tabs.Content className="px-tabpanel" value="c">每个部件可单独包裹，加自己的事件与 ref。</Tabs.Content>
      </Tabs.Root>
    </Card>
  );
}

function ProgressCard() {
  const [v, setV] = useState(64);
  return (
    <Card nm="Progress" foot="aria-valuenow 表达进度语义">
      <div className="dg-col" style={{ gap: 10 }}>
        <div className="px-progress-wrap" style={{ maxWidth: 'none' }}>
          <div className="dg-prog-row">
            <span>上传进度</span>
            <b className="nums">{v}%</b>
          </div>
          <Progress.Root className="px-progress" value={v} id="dg-prog" aria-label="上传进度">
            <Progress.Indicator className="px-progress-indicator" style={{ transform: `translateX(-${100 - v}%)` }} />
          </Progress.Root>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" className="dg-step" onClick={() => setV((x) => Math.max(0, x - 12))}>−12</button>
          <button type="button" className="dg-step" onClick={() => setV((x) => Math.min(100, x + 12))}>+12</button>
        </div>
      </div>
    </Card>
  );
}

function TooltipAvatarCard() {
  return (
    <Card nm="Tooltip · Avatar" foot="Tooltip 不能包含可交互元素">
      <div className="p-row">
        <Tooltip.Provider delayDuration={150}>
          <Tooltip.Root>
            <Tooltip.Trigger className="px-btn px-btn-small px-btn-linklike">悬停我</Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className="px-tooltip" sideOffset={6}>
                提示里不放可交互元素
                <Tooltip.Arrow className="px-tooltip-arrow" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
        <span className="dg-avatars">
          <span className="px-avatar">
            <Avatar.Root>
              <Avatar.Image className="px-avatar-image" src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='38' height='38'%3E%3Crect width='38' height='38' fill='%236e56cf'/%3E%3C/svg%3E" alt="用户头像" />
              <Avatar.Fallback className="px-avatar-fallback">P</Avatar.Fallback>
            </Avatar.Root>
          </span>
          <span className="px-avatar">R</span>
        </span>
      </div>
    </Card>
  );
}

function ToggleGroupCard() {
  return (
    <Card nm="ToggleGroup" foot="单选可多选，整组一个 Tab 停靠点">
      <ToggleGroup.Root type="single" defaultValue="中" className="px-toggle-group" aria-label="对齐方式">
        {['左对齐', '居中', '右对齐'].map((x) => (
          <ToggleGroup.Item className="px-toggle" value={x} key={x}>
            {x}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    </Card>
  );
}

/* ---------- hero 右侧卡 ---------- */
export function HeroDemo() {
  const [on, setOn] = useState(true);
  return (
    <div className="hero-side" data-ui>
      <span className="hero-side-cap">下面这些部件都是真的，现在就能按</span>
      <div className="dcard" style={{ minHeight: 0, padding: 20 }}>
        <div className="p-row">
          <Switch.Root className="px-switch" checked={on} onCheckedChange={setOn} aria-label="自动更新" id="hd-sw">
            <Switch.Thumb className="px-switch-thumb" />
          </Switch.Root>
          <span style={{ fontSize: 14 }}>自动更新</span>
          <code className="dg-read" style={{ marginLeft: 'auto' }}>aria-checked="{String(on)}"</code>
        </div>
        <div className="dg-hr" />
        <Tabs.Root defaultValue="a">
          <Tabs.List className="px-tabs-list" aria-label="安装方式">
            <Tabs.Trigger className="px-tab" value="a">聚合包</Tabs.Trigger>
            <Tabs.Trigger className="px-tab" value="b">单独安装</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className="px-tabpanel" value="a">装一次 radix-ui，import 需要的原语，其余被 tree-shaking 掉。</Tabs.Content>
          <Tabs.Content className="px-tabpanel" value="b">npm install @radix-ui/react-dialog 按需装，建议整组一起升级。</Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}

/* ---------- 8 卡网格 ---------- */
export default function DemoGrid() {
  return (
    <div className="demo-grid">
      <SwitchCard />
      <SliderCard />
      <CheckboxCard />
      <RadioCard />
      <TabsCard />
      <ProgressCard />
      <TooltipAvatarCard />
      <ToggleGroupCard />
    </div>
  );
}