/**
 * 文档页内嵌的可试玩组件。
 * MDX 里用它把「读一段文字」变成「按一下」。
 */
import { useState } from 'react';
import { Dialog, Select, Slider, Switch, Tabs, ToggleGroup } from 'radix-ui';

type Kind = 'switch' | 'dialog' | 'tabs' | 'slider' | 'select' | 'toggle';

const COPY: Record<Kind, { label: string; hint: string }> = {
  switch: { label: 'Switch', hint: '按空格切换，读数里的 aria-checked 会跟着变。' },
  dialog: { label: 'Dialog', hint: '打开后焦点被锁在里面，按 Esc 关闭。' },
  tabs: { label: 'Tabs', hint: '方向键在标签间移动，aria-selected 标出当前项。' },
  slider: { label: 'Slider', hint: '拖动或用方向键，aria-valuenow 带着当前数值。' },
  select: { label: 'Select', hint: '整个流程都能用键盘走完。' },
  toggle: { label: 'ToggleGroup', hint: 'roving focus 让整组只占一个 Tab 停靠点。' },
};

export default function DocDemo({ kind }: { kind: Kind }) {
  const [checked, setChecked] = useState(true);

  switch (kind) {
    case 'switch':
      return (
        <div className="px-row">
          <Switch.Root
            className="a11y-switch"
            checked={checked}
            onCheckedChange={setChecked}
            id="doc-switch"
            aria-label="自动更新"
          >
            <Switch.Thumb className="a11y-switch-thumb" />
          </Switch.Root>
          <code>aria-checked={String(checked)}</code>
        </div>
      );
    case 'dialog':
      return (
        <Dialog.Root>
          <Dialog.Trigger className="px-btn">打开对话框</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="px-overlay" />
            <Dialog.Content className="px-dialog">
              <Dialog.Title className="px-dialog-title">焦点在这里</Dialog.Title>
              <Dialog.Description className="px-dialog-desc">
                Tab 键不会走到对话框外面去。
              </Dialog.Description>
              <Dialog.Close className="px-btn px-btn-solid">知道了</Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      );
    case 'tabs':
      return (
        <Tabs.Root defaultValue="a" className="px-tabs">
          <Tabs.List className="px-tabs-list" aria-label="示例">
            <Tabs.Trigger className="px-tab" value="a">第一个</Tabs.Trigger>
            <Tabs.Trigger className="px-tab" value="b">第二个</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className="px-tabpanel" value="a">第一个面板的内容。</Tabs.Content>
          <Tabs.Content className="px-tabpanel" value="b">第二个面板的内容。</Tabs.Content>
        </Tabs.Root>
      );
    case 'slider':
      return <SliderDemo />;
    case 'select':
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
    case 'toggle':
      return (
        <ToggleGroup.Root type="single" defaultValue="c" className="px-row" aria-label="对齐">
          <ToggleGroup.Item className="px-toggle" value="l">左</ToggleGroup.Item>
          <ToggleGroup.Item className="px-toggle" value="c">中</ToggleGroup.Item>
          <ToggleGroup.Item className="px-toggle" value="r">右</ToggleGroup.Item>
        </ToggleGroup.Root>
      );
  }
}

function SliderDemo() {
  const [value, setValue] = useState([45]);
  return (
    <div className="px-slider-wrap">
      <Slider.Root
        value={value}
        onValueChange={setValue}
        max={100}
        className="px-slider"
        aria-label="示例数值"
      >
        <Slider.Track className="px-slider-track">
          <Slider.Range className="px-slider-range" />
        </Slider.Track>
        <Slider.Thumb className="px-slider-thumb" />
      </Slider.Root>
      <code>aria-valuenow={value[0]}</code>
    </div>
  );
}