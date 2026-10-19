/**
 * 第二组接口片段：与 FragmentWall 分开渲染，各自成为独立的一张图片。
 * 选的是浮层与反馈类组件，属性读数写在标签上。
 */
import { Popover, Progress, Slider, Switch, Tooltip } from 'radix-ui';
import { useState } from 'react';

export default function FragmentWallTwo() {
  const [v, setV] = useState([35]);
  return (
    <>
      <div className="fragments" data-ui>
        <div className="fragment fragment-wide">
          <p className="fragment-label">Slider</p>
          <div className="fragment-body">
            <Slider.Root
              value={v}
              onValueChange={setV}
              max={100}
              className="px-slider"
              aria-label="片段示例数值"
            >
              <Slider.Track className="px-slider-track">
                <Slider.Range className="px-slider-range" />
              </Slider.Track>
              <Slider.Thumb className="px-slider-thumb" />
            </Slider.Root>
          </div>
        </div>

        <div className="fragment">
          <p className="fragment-label">Popover</p>
          <div className="fragment-body">
            <Popover.Root>
              <Popover.Trigger className="px-btn px-btn-small">打开</Popover.Trigger>
              <Popover.Portal>
                <Popover.Content className="px-popover" sideOffset={8}>
                  <Popover.Arrow className="px-popover-arrow" />
                  <Popover.Description className="px-popover-desc">
                    定位与碰撞检测由内部处理。
                  </Popover.Description>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>
        </div>

        <div className="fragment">
          <p className="fragment-label">Tooltip</p>
          <div className="fragment-body">
            <Tooltip.Provider delayDuration={150}>
              <Tooltip.Root>
                <Tooltip.Trigger className="px-btn px-btn-small">悬停</Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content className="px-tooltip" sideOffset={6}>
                    不能含可交互元素
                    <Tooltip.Arrow className="px-tooltip-arrow" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
        </div>

        <div className="fragment">
          <p className="fragment-label">Progress</p>
          <div className="fragment-body">
            <Progress.Root className="px-progress" value={v[0]}>
              <Progress.Indicator
                className="px-progress-indicator"
                style={{ transform: `translateX(-${100 - v[0]}%)` }}
              />
            </Progress.Root>
          </div>
        </div>

        <div className="fragment">
          <p className="fragment-label">Switch</p>
          <div className="fragment-body">
            <Switch.Root defaultChecked className="a11y-switch" aria-label="片段示例开关" id="fr2-sw">
              <Switch.Thumb className="a11y-switch-thumb" />
            </Switch.Root>
          </div>
        </div>
      </div>
    </>
  );
}