/**
 * 组件索引的中文内容层。
 *
 * parts 字段不在这里手写：它由 scripts/extract-parts.mjs 从
 * node_modules 下各 @radix-ui/react-* 包的公开 export 语句中抽取，
 * 每次 `bun run sync:parts` 重新生成。这里只负责中文名称、说明与分类。
 */

import partsJson from './parts.json';

/** WAI-ARIA Authoring Practices 中的对应模式（用于说明它遵循哪条规范） */
export type Category =
  | 'disclosure'
  | 'dialog'
  | 'menu'
  | 'form'
  | 'navigation'
  | 'feedback'
  | 'layout';

export interface ComponentMeta {
  /** 中文名 */
  zh: string;
  /** 一句话说明，写具体的：它解决什么，不写营销话 */
  note: string;
  category: Category;
  /** 索引右侧那两三字的中文短描述 */
  brief: string;
}

export interface Component {
  name: string;
  pkg: string;
  parts: string[];
  zh: string;
  note: string;
  brief: string;
  category: Category;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  disclosure: '折叠与展开',
  dialog: '对话框与浮层',
  menu: '菜单',
  form: '表单控件',
  navigation: '导航',
  feedback: '状态反馈',
  layout: '布局',
};

/** 中文元数据，以组件名为键 */
const META: Record<string, ComponentMeta> = {
  Accordion: { zh: '手风琴', note: '一组可折叠的标题，正文同时只展开一项或多项。', brief: '折叠展开', category: 'disclosure' },
  AlertDialog: { zh: '警告对话框', note: '需要用户确认才继续的模态框，打开时焦点自动落到「取消」。', brief: '确认弹窗', category: 'dialog' },
  AspectRatio: { zh: '宽高比', note: '锁定子元素的宽高比，避免图片或视频加载时布局跳动。', brief: '锁定比例', category: 'layout' },
  Avatar: { zh: '头像', note: '图片与备用文本二选一，图片加载失败时自动回退到首字母。', brief: '头像回退', category: 'layout' },
  Checkbox: { zh: '复选框', note: '布尔或枚举多选，内置隐藏的原生 input 参与表单提交。', brief: '多选', category: 'form' },
  Collapsible: { zh: '可折叠', note: '单个区域的显示与隐藏，手风琴就是它加上了组与协调逻辑。', brief: '单块折叠', category: 'disclosure' },
  ContextMenu: { zh: '上下文菜单', note: '右键唤出的菜单，支持子菜单、单选组与勾选项。', brief: '右键菜单', category: 'menu' },
  Dialog: { zh: '对话框', note: '模态浮层：焦点锁定在其中，关闭后焦点回到触发它的那个按钮。', brief: '模态焦点', category: 'dialog' },
  Direction: { zh: '方向', note: '为下游组件提供书写方向，影响箭头与对齐的取值。', brief: '书写方向', category: 'layout' },
  DropdownMenu: { zh: '下拉菜单', note: '点击唤出的菜单，键盘方向键在各项之间移动焦点。', brief: '点击菜单', category: 'menu' },
  Form: { zh: '表单', note: '把匹配器、错误消息与提交状态接到原生表单约束上。', brief: '表单约束', category: 'form' },
  HoverCard: { zh: '悬停卡片', note: '指针停留后浮现的补充信息，与点击触发的 Popover 相对。', brief: '悬停浮层', category: 'dialog' },
  Label: { zh: '标签', note: '原生 label 元素，与 Radix 的表单控件配合提供可访问名称。', brief: '可访问名', category: 'form' },
  Menubar: { zh: '菜单栏', note: '横向菜单栏，含下拉、子菜单与横向方向键导航。', brief: '横向菜单', category: 'menu' },
  NavigationMenu: { zh: '导航菜单', note: '为站点主导航设计的一级菜单，支持键盘与指针两种激活方式。', brief: '主导航', category: 'navigation' },
  Popover: { zh: '气泡卡片', note: '由点击或受控状态触发的浮层，可定位到触发器的某一侧。', brief: '定位浮层', category: 'dialog' },
  Portal: { zh: '传送门', note: '把子树渲染到 DOM 的另一处，避开父级的 overflow 与 z-index 陷阱。', brief: '脱离父级', category: 'layout' },
  Progress: { zh: '进度条', note: '以 aria-valuenow 表达进度的条形控件，数值变化时同步播报。', brief: '进度语义', category: 'feedback' },
  RadioGroup: { zh: '单选组', note: '一组互斥选项，方向键在未选中的项之间循环移动。', brief: '互斥选择', category: 'form' },
  ScrollArea: { zh: '滚动区域', note: '原生滚动加上自定义滚动条与视口，支持横向与纵向。', brief: '原生滚动', category: 'layout' },
  Select: { zh: '选择器', note: '复合控件：触发器、视口、滚动按钮与分组，键盘全流程可用。', brief: '复合选择', category: 'form' },
  Separator: { zh: '分隔线', note: '带 role="separator" 的元素，语义为分隔而非纯粹画一根线。', brief: '语义分隔', category: 'layout' },
  Slider: { zh: '滑块', note: '在连续区间取值，滑块支持键盘微调并暴露当前数值。', brief: '区间取值', category: 'form' },
  Slot: { zh: '插槽', note: '把 props 合并到你传入的子元素上，是 asChild 的底层实现。', brief: 'props 合并', category: 'layout' },
  Switch: { zh: '开关', note: '立即生效的二态开关，与需要提交才生效的复选框相区分。', brief: '二态开关', category: 'form' },
  Tabs: { zh: '标签页', note: '标签与面板的配对，方向键在标签间移动并自动激活。', brief: '标签配对', category: 'navigation' },
  Toast: { zh: '轻提示', note: '短暂的消息通知，支持操作按钮与键盘可达的关闭控件。', brief: '消息通知', category: 'feedback' },
  Toggle: { zh: '切换按钮', note: '两态按钮，本身不是一个分组，状态由 aria-pressed 表达。', brief: '两态按钮', category: 'form' },
  ToggleGroup: { zh: '切换组', note: '多个切换按钮的集合，可单选可多选，含 roving focus。', brief: '成组切换', category: 'form' },
  Toolbar: { zh: '工具栏', note: '容器级控件集合，用 roving focus 让整条栏只占一个 Tab 停靠点。', brief: '漫游焦点', category: 'navigation' },
  Tooltip: { zh: '文字提示', note: '悬停或聚焦时出现的信息气泡，本身不能包含可交互元素。', brief: '悬停提示', category: 'feedback' },
  VisuallyHidden: { zh: '视觉隐藏', note: '在视觉上移出屏幕但保留给读屏器，样式不隐藏语义。', brief: '读屏可见', category: 'layout' },
  AccessibleIcon: { zh: '无障碍图标', note: '装饰性图标包一层，供读屏器跳过而不必逐个处理 aria-hidden。', brief: '装饰图标', category: 'layout' },
};

const raw = partsJson as {
  componentCount: number;
  totalParts: number;
  components: { pkg: string; component: string; parts: string[] }[];
};

export const components: Component[] = raw.components.map((c) => {
  const meta = META[c.component];
  if (!meta) throw new Error(`组件 ${c.component} 缺少中文元数据`);
  return {
    name: c.component,
    pkg: c.pkg,
    parts: c.parts,
    zh: meta.zh,
    note: meta.note,
    brief: meta.brief,
    category: meta.category,
  };
});

export const componentCount = components.length;
export const totalParts = raw.totalParts;

/** 按分类分组，保持中文分类的固定顺序 */
export const CATEGORY_ORDER: Category[] = [
  'dialog',
  'disclosure',
  'menu',
  'form',
  'navigation',
  'feedback',
  'layout',
];

export function byCategory(cat: Category): Component[] {
  return components.filter((c) => c.category === cat);
}

export function findComponent(name: string): Component | undefined {
  return components.find((c) => c.name === name);
}