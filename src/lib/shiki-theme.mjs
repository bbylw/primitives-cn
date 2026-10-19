/**
 * Radix 官方风深色代码主题。
 * 配色与落地页手写代码块一致：蓝函数、绿字符串、粉标签，
 * 刻意避开 terracotta 橙与 violet 紫（门禁 + 品牌纪律）。
 */
export default {
  name: 'radix-dark',
  type: 'dark',
  colors: {
    'editor.background': '#1b1b1f',
    'editor.foreground': '#d6d6dc',
  },
  settings: [
    { settings: { background: '#1b1b1f', foreground: '#d6d6dc' } },
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#8a91a0', fontStyle: 'italic' } },
    { scope: ['keyword', 'storage', 'storage.type', 'keyword.control'], settings: { foreground: '#c792ea' } },
    { scope: ['entity.name.function', 'support.function', 'meta.function-call', 'meta.function-call.generic'], settings: { foreground: '#82aaff' } },
    { scope: ['entity.name.type', 'support.type', 'support.class', 'entity.name.class'], settings: { foreground: '#82aaff' } },
    { scope: ['string', 'string.quoted'], settings: { foreground: '#c3e88d' } },
    { scope: ['constant.numeric', 'constant.language', 'variable.language'], settings: { foreground: '#89ddff' } },
    { scope: ['variable', 'meta.object-literal.key', 'support.variable', 'meta.property-name'], settings: { foreground: '#d6d6dc' } },
    { scope: ['entity.name.tag', 'meta.tag'], settings: { foreground: '#f07178' } },
    { scope: ['punctuation', 'meta.brace', 'meta.delimiter'], settings: { foreground: '#9a9aa5' } },
    { scope: ['meta.jsx.children'], settings: { foreground: '#d6d6dc' } },
  ],
};