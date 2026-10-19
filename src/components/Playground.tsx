/**
 * 部件试玩台：每个组件都用自己的真实部件渲染成可操作的样子。
 *
 * 组件清单来自包的真实导出（src/data/parts.json），所以这里出现的
 * 每个部件名都是这个包确实导出的名字，不是文档里抄来的示意。
 */
import { useState } from 'react';
import {
  Accordion,
  AlertDialog,
  AspectRatio,
  Avatar,
  Checkbox,
  Collapsible,
  Dialog,
  HoverCard,
  Label,
  Popover,
  Progress,
  RadioGroup,
  ScrollArea,
  Select,
  Separator,
  Slider,
  Switch,
  Tabs,
  Toast,
  Toggle,
  ToggleGroup,
  Tooltip,
} from 'radix-ui';

/** 每个可试玩的组件：真实部件 + 一句中文说明 */
const DEMOS = {
  Accordion: {
    zh: '手风琴',
    parts: ['Root', 'Item', 'Header', 'Trigger', 'Content'],
    node: (
      <Accordion.Root type="single" collapsible defaultValue="item-1" className="px-accordion">
        <Accordion.Item value="item-1" className="px-accordion-item">
          <Accordion.Header className="px-accordion-header">
            <Accordion.Trigger className="px-accordion-trigger">Radix 有哪些特性</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="px-accordion-content">
            无障碍、无样式、开放组合、非受控、开发者体验，以及渐进式采用。
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2" className="px-accordion-item">
          <Accordion.Header className="px-accordion-header">
            <Accordion.Trigger className="px-accordion-trigger">怎样安装</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="px-accordion-content">
            装聚合包 radix-ui，或者按组件单独安装 @radix-ui/react-*。
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    ),
  },
  Dialog: {
    zh: '对话框',
    parts: ['Root', 'Trigger', 'Portal', 'Overlay', 'Content', 'Title', 'Description', 'Close'],
    node: (
      <Dialog.Root>
        <Dialog.Trigger className="px-btn">打开对话框</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="px-overlay" />
          <Dialog.Content className="px-dialog">
            <Dialog.Title className="px-dialog-title">删除这个项目？</Dialog.Title>
            <Dialog.Description className="px-dialog-desc">
              焦点已被锁在这个对话框内，按 Esc 或点外部关闭。
            </Dialog.Description>
            <div className="px-dialog-actions">
              <Dialog.Close className="px-btn">取消</Dialog.Close>
              <Dialog.Close className="px-btn px-btn-solid">确认删除</Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    ),
  },
  AlertDialog: {
    zh: '警告对话框',
    parts: ['Root', 'Trigger', 'Portal', 'Overlay', 'Content', 'Title', 'Description', 'Action', 'Cancel'],
    node: (
      <AlertDialog.Root>
        <AlertDialog.Trigger className="px-btn">请求一次确认</AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="px-overlay" />
          <AlertDialog.Content className="px-dialog">
            <AlertDialog.Title className="px-dialog-title">确认继续？</AlertDialog.Title>
            <AlertDialog.Description className="px-dialog-desc">
              打开时焦点自动落在「取消」上。
            </AlertDialog.Description>
            <div className="px-dialog-actions">
              <AlertDialog.Cancel className="px-btn">取消</AlertDialog.Cancel>
              <AlertDialog.Action className="px-btn px-btn-solid">继续</AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    ),
  },
  Popover: {
    zh: '气泡卡片',
    parts: ['Root', 'Trigger', 'Anchor', 'Portal', 'Content', 'Arrow', 'Close', 'Title', 'Description'],
    node: (
      <Popover.Root>
        <Popover.Trigger className="px-btn">打开气泡卡片</Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className="px-popover" sideOffset={8}>
            <Popover.Arrow className="px-popover-arrow" />
            <Popover.Title className="px-popover-title">定位在触发器下方</Popover.Title>
            <Popover.Description className="px-popover-desc">
              数据侧与碰撞检测由 Floating UI 处理。
            </Popover.Description>
            <Popover.Close className="px-btn px-btn-small">关闭</Popover.Close>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    ),
  },
  HoverCard: {
    zh: '悬停卡片',
    parts: ['Root', 'Trigger', 'Portal', 'Content', 'Arrow'],
    node: (
      <HoverCard.Root openDelay={150} closeDelay={80}>
        <HoverCard.Trigger className="px-btn px-btn-linklike">悬停或聚焦我</HoverCard.Trigger>
        <HoverCard.Portal>
          <HoverCard.Content className="px-popover" sideOffset={8}>
            <HoverCard.Arrow className="px-popover-arrow" />
            <p className="px-popover-desc">指针停留片刻后出现，不占用点击。</p>
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>
    ),
  },
  Tabs: {
    zh: '标签页',
    parts: ['Root', 'List', 'Trigger', 'Content'],
    node: (
      <Tabs.Root defaultValue="a" className="px-tabs">
        <Tabs.List className="px-tabs-list" aria-label="示例">
          <Tabs.Trigger className="px-tab" value="a">无障碍</Tabs.Trigger>
          <Tabs.Trigger className="px-tab" value="b">无样式</Tabs.Trigger>
          <Tabs.Trigger className="px-tab" value="c">开放</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="px-tabpanel" value="a">
          遵循 WAI-ARIA 设计模式，焦点管理与键盘导航已在内部处理。
        </Tabs.Content>
        <Tabs.Content className="px-tabpanel" value="b">
          组件不带任何样式，交给你的样式方案决定外观。
        </Tabs.Content>
        <Tabs.Content className="px-tabpanel" value="c">
          每个部件都能单独包裹、自定义事件与 ref。
        </Tabs.Content>
      </Tabs.Root>
    ),
  },
  Collapsible: {
    zh: '可折叠',
    parts: ['Root', 'Trigger', 'Content'],
    node: (
      <Collapsible.Root className="px-collapsible">
        <Collapsible.Trigger className="px-btn">展开筛选条件</Collapsible.Trigger>
        <Collapsible.Content className="px-collapsible-content">
          这是折叠出来的内容区域，高度与透明度都被动画接管。
        </Collapsible.Content>
      </Collapsible.Root>
    ),
  },
  Checkbox: {
    zh: '复选框',
    parts: ['Root', 'Indicator'],
    node: (
      <div className="px-row">
        <label className="px-check-label" htmlFor="px-check-demo">
          <Checkbox.Root id="px-check-demo" defaultChecked className="px-checkbox">
            <Checkbox.Indicator className="px-checkbox-indicator" />
          </Checkbox.Root>
          <span>包含未读邮件</span>
        </label>
      </div>
    ),
  },
  Switch: {
    zh: '开关',
    parts: ['Root', 'Thumb'],
    node: (
      <div className="px-row">
        <Label.Root className="px-switch-label" htmlFor="px-switch-demo">
          自动更新
        </Label.Root>
        <Switch.Root id="px-switch-demo" defaultChecked className="px-switch">
          <Switch.Thumb className="px-switch-thumb" />
        </Switch.Root>
      </div>
    ),
  },
  Toggle: {
    zh: '切换按钮',
    parts: ['Root'],
    node: (
      <div className="px-row">
        <Toggle.Root className="px-toggle" defaultPressed aria-label="加粗">
          加粗
        </Toggle.Root>
        <Toggle.Root className="px-toggle" aria-label="斜体">
          斜体
        </Toggle.Root>
      </div>
    ),
  },
  ToggleGroup: {
    zh: '切换组',
    parts: ['Root', 'Item'],
    node: (
      <ToggleGroup.Root type="multiple" defaultValue={['b']} className="px-row" aria-label="对齐方式">
        <ToggleGroup.Item className="px-toggle" value="a">左对齐</ToggleGroup.Item>
        <ToggleGroup.Item className="px-toggle" value="b">居中</ToggleGroup.Item>
        <ToggleGroup.Item className="px-toggle" value="c">右对齐</ToggleGroup.Item>
      </ToggleGroup.Root>
    ),
  },
  Slider: {
    zh: '滑块',
    parts: ['Root', 'Track', 'Range', 'Thumb'],
    node: (
      <div className="px-slider-wrap">
        <Slider.Root defaultValue={[45]} max={100} step={5} className="px-slider" aria-label="对比度">
          <Slider.Track className="px-slider-track">
            <Slider.Range className="px-slider-range" />
          </Slider.Track>
          <Slider.Thumb className="px-slider-thumb" />
        </Slider.Root>
      </div>
    ),
  },
  RadioGroup: {
    zh: '单选组',
    parts: ['Root', 'Item', 'Indicator'],
    node: (
      <RadioGroup.Root defaultValue="md" className="px-radiogroup" aria-label="尺寸">
        <div className="px-radio-item">
          <RadioGroup.Item value="sm" className="px-radio"><RadioGroup.Indicator className="px-radio-dot" /></RadioGroup.Item>
          <label htmlFor="px-radio-sm">小</label>
        </div>
        <div className="px-radio-item">
          <RadioGroup.Item id="px-radio-sm" value="md" className="px-radio"><RadioGroup.Indicator className="px-radio-dot" /></RadioGroup.Item>
          <label htmlFor="px-radio-md">中</label>
        </div>
        <div className="px-radio-item">
          <RadioGroup.Item value="lg" className="px-radio"><RadioGroup.Indicator className="px-radio-dot" /></RadioGroup.Item>
          <label htmlFor="px-radio-lg">大</label>
        </div>
      </RadioGroup.Root>
    ),
  },
  Select: {
    zh: '选择器',
    parts: ['Root', 'Trigger', 'Value', 'Icon', 'Portal', 'Content', 'Viewport', 'Item', 'ItemText', 'ItemIndicator'],
    node: (
      <Select.Root>
        <Select.Trigger className="px-select-trigger" aria-label="安装方式">
          <Select.Value placeholder="选择安装方式" />
          <Select.Icon className="px-select-icon"><CaretDown /></Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="px-select-content" position="popper" sideOffset={6}>
            <Select.Viewport className="px-select-viewport">
              <Select.Item className="px-select-item" value="all">
                <Select.ItemText>聚合包 radix-ui</Select.ItemText>
                <Select.ItemIndicator className="px-select-check">
                  <CheckMark />
                </Select.ItemIndicator>
              </Select.Item>
              <Select.Item className="px-select-item" value="single">
                <Select.ItemText>单独安装组件</Select.ItemText>
                <Select.ItemIndicator className="px-select-check">
                  <CheckMark />
                </Select.ItemIndicator>
              </Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    ),
  },
  Progress: {
    zh: '进度条',
    parts: ['Root', 'Indicator'],
    node: <ProgressDemo />,
  },
  Tooltip: {
    zh: '文字提示',
    parts: ['Provider', 'Root', 'Trigger', 'Portal', 'Content', 'Arrow'],
    node: (
      <Tooltip.Provider delayDuration={200}>
        <Tooltip.Root>
          <Tooltip.Trigger className="px-btn px-btn-linklike">聚焦或悬停这里</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className="px-tooltip" sideOffset={6}>
              提示本身不能包含可交互元素
              <Tooltip.Arrow className="px-tooltip-arrow" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    ),
  },
  Avatar: {
    zh: '头像',
    parts: ['Root', 'Image', 'Fallback'],
    node: (
      <div className="px-row">
        <Avatar.Root className="px-avatar">
          <Avatar.Image className="px-avatar-image" src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect width='64' height='64' fill='%234f6238'/%3E%3C/svg%3E" alt="示例头像" />
          <Avatar.Fallback className="px-avatar-fallback" delayMs={0}>R</Avatar.Fallback>
        </Avatar.Root>
        <span className="small muted">图片加载失败时回退到首字母</span>
      </div>
    ),
  },
  AspectRatio: {
    zh: '宽高比',
    parts: ['Root'],
    node: (
      <div className="px-ar">
        <AspectRatio.Root ratio={16 / 9}>
          <div className="px-ar-inner">16 / 9</div>
        </AspectRatio.Root>
      </div>
    ),
  },
  Separator: {
    zh: '分隔线',
    parts: ['Root'],
    node: (
      <div className="px-sep-wrap">
        <p className="small muted">分隔线是语义元素，role="separator"。</p>
        <Separator.Root className="px-sep" />
        <p className="small muted">它的默认可聚焦性交给浏览器。</p>
      </div>
    ),
  },
  ScrollArea: {
    zh: '滚动区域',
    parts: ['Root', 'Viewport', 'Scrollbar', 'Thumb', 'Corner'],
    node: (
      <ScrollArea.Root className="px-scrollarea">
        <ScrollArea.Viewport className="px-scrollarea-viewport">
          <div className="px-scrollarea-inner">
            {['无障碍', '无样式', '开放', '非受控', '开发者体验', '渐进采用', 'Tree-shakeable'].map((t) => (
              <p key={t} className="px-scrollarea-line">{t}</p>
            ))}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar className="px-scrollbar" orientation="vertical">
          <ScrollArea.Thumb className="px-thumb" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className="px-corner" />
      </ScrollArea.Root>
    ),
  },
  Toast: {
    zh: '轻提示',
    parts: ['Provider', 'Root', 'Title', 'Description', 'Action', 'Close', 'Viewport'],
    node: (
      <Toast.Provider swipeDirection="right">
        <ToastDemo />
      </Toast.Provider>
    ),
  },
} as const;

type DemoKey = keyof typeof DEMOS;

/** 勾选标记：矢量绘制，不用符号字符 */
function CheckMark() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
      <path d="M2 6.4 4.6 9 10 3.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 下拉箭头 */
function CaretDown() {
  return (
    <svg width="10" height="7" viewBox="0 0 10 7" aria-hidden="true" focusable="false">
      <path d="M1 1.4 5 5.4 9 1.4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 关闭叉 */
function CrossMark() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden="true" focusable="false">
      <path d="M1.5 1.5 9.5 9.5M9.5 1.5 1.5 9.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ProgressDemo() {
  const [value, setValue] = useState(38);
  return (
    <div className="px-progress-wrap">
      <Progress.Root className="px-progress" value={value}>
        <Progress.Indicator className="px-progress-indicator" style={{ transform: `translateX(-${100 - value}%)` }} />
      </Progress.Root>
      <div className="px-row">
        <button type="button" className="px-btn px-btn-small" onClick={() => setValue((v) => Math.max(0, v - 12))}>减 12</button>
        <button type="button" className="px-btn px-btn-small" onClick={() => setValue((v) => Math.min(100, v + 12))}>加 12</button>
        <span className="small nums muted">{value}%</span>
      </div>
    </div>
  );
}

function ToastDemo() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  return (
    <div className="px-row">
      <button type="button" className="px-btn" onClick={() => setOpen(true)}>弹出提示</button>
      <Toast.Root
        className="px-toast"
        open={open}
        onOpenChange={setOpen}
        duration={6000}
      >
        <Toast.Title className="px-toast-title">版本更新</Toast.Title>
        <Toast.Description className="px-toast-desc">
          已触发 {count} 次，可关闭或等它自己消失。
        </Toast.Description>
        <Toast.Action className="px-toast-action" asChild altText="再触发一次">
          <button type="button" onClick={() => setCount((c) => c + 1)}>再来一次</button>
        </Toast.Action>
        <Toast.Close className="px-toast-close" aria-label="关闭"><CrossMark /></Toast.Close>
      </Toast.Root>
      <Toast.Viewport className="px-toast-viewport" />
    </div>
  );
}

const KEYS = Object.keys(DEMOS) as DemoKey[];

export default function Playground({ name }: { name: DemoKey }) {
  const demo = DEMOS[name];
  if (!demo) return null;
  return (
    <div className="px-playground" data-ui>
      <div className="px-playground-parts">
        <p className="px-playground-parts-title">这个组件导出的部件</p>
        <ul className="px-playground-parts-list">
          {demo.parts.map((p) => (
            <li key={p}><code>{name}.{p}</code></li>
          ))}
        </ul>
      </div>
      <div className="px-playground-stage">{demo.node}</div>
    </div>
  );
}

export { KEYS as PLAYGROUND_KEYS };
export type { DemoKey };