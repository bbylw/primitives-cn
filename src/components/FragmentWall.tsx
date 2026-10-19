/**
 * 文档页里的「接口片段」墙：把若干真实组件并排放在一起。
 * 这是软件主题自己的图片，标记 data-ui。
 *
 * 必须是 React 组件而不是 .astro：Radix 的部件依赖 React 上下文。
 */
import { Accordion, Checkbox, Progress, RadioGroup, ScrollArea, Separator, Switch, Toggle } from 'radix-ui';

export default function FragmentWall() {
  return (
    <>
      <div className="fragments" data-ui>
      <div className="fragment">
        <p className="fragment-label">Switch</p>
        <div className="fragment-body">
          <Switch.Root defaultChecked className="a11y-switch" aria-label="示例开关" id="fr-sw">
            <Switch.Thumb className="a11y-switch-thumb" />
          </Switch.Root>
        </div>
      </div>

      <div className="fragment">
        <p className="fragment-label">Toggle</p>
        <div className="fragment-body">
          <div className="px-row">
            <Toggle.Root className="px-toggle" defaultPressed aria-label="加粗">加粗</Toggle.Root>
            <Toggle.Root className="px-toggle" aria-label="斜体">斜体</Toggle.Root>
          </div>
        </div>
      </div>

      <div className="fragment">
        <p className="fragment-label">Checkbox</p>
        <div className="fragment-body">
          <label className="px-check-label" htmlFor="fr-cb">
            <Checkbox.Root id="fr-cb" defaultChecked className="px-checkbox">
              <Checkbox.Indicator className="px-checkbox-indicator" />
            </Checkbox.Root>
            <span>已读回执</span>
          </label>
        </div>
      </div>

      <div className="fragment">
        <p className="fragment-label">RadioGroup</p>
        <div className="fragment-body">
          <RadioGroup.Root defaultValue="b" className="px-radiogroup" aria-label="密度">
            <div className="px-radio-item">
              <RadioGroup.Item id="fr-ra" value="a" className="px-radio"><RadioGroup.Indicator className="px-radio-dot" /></RadioGroup.Item>
              <label htmlFor="fr-ra">紧凑</label>
            </div>
            <div className="px-radio-item">
              <RadioGroup.Item id="fr-rb" value="b" className="px-radio"><RadioGroup.Indicator className="px-radio-dot" /></RadioGroup.Item>
              <label htmlFor="fr-rb">标准</label>
            </div>
          </RadioGroup.Root>
        </div>
      </div>

      <div className="fragment">
        <p className="fragment-label">Progress</p>
        <div className="fragment-body">
          <Progress.Root className="px-progress" value={64} aria-label="示例进度">
            <Progress.Indicator className="px-progress-indicator" style={{ transform: 'translateX(-36%)' }} />
          </Progress.Root>
        </div>
      </div>

      <div className="fragment">
        <p className="fragment-label">Separator</p>
        <div className="fragment-body">
          <Separator.Root className="px-sep" />
        </div>
      </div>

      </div>

      <div className="fragments" data-ui>
      <div className="fragment fragment-wide">
        <p className="fragment-label">Accordion</p>
        <div className="fragment-body">
          <Accordion.Root type="single" collapsible defaultValue="a" className="px-accordion">
            <Accordion.Item value="a" className="px-accordion-item">
              <Accordion.Header className="px-accordion-header">
                <Accordion.Trigger className="px-accordion-trigger">默认展开</Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-accordion-content">内容区域。</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="b" className="px-accordion-item">
              <Accordion.Header className="px-accordion-header">
                <Accordion.Trigger className="px-accordion-trigger">另一个条目</Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-accordion-content">按需展开。</Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </div>
      </div>

      </div>

      <div className="fragments" data-ui>
      <div className="fragment fragment-wide">
        <p className="fragment-label">ScrollArea</p>
        <div className="fragment-body">
          <ScrollArea.Root className="px-scrollarea">
            <ScrollArea.Viewport className="px-scrollarea-viewport" tabIndex={0} aria-label="特性列表滚动区域">
              <div className="px-scrollarea-inner">
                {['无障碍', '无样式', '开放', '非受控', '开发者体验', '渐进采用'].map((t) => (
                  <p key={t} className="px-scrollarea-line">{t}</p>
                ))}
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar className="px-scrollbar" orientation="vertical">
              <ScrollArea.Thumb className="px-thumb" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner className="px-corner" />
          </ScrollArea.Root>
        </div>
      </div>
      </div>
    </>
  );
}