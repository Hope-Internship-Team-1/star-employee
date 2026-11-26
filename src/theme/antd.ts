import type { ThemeConfig } from 'antd';

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#B4532D',
    colorLink: '#B4532D',
    colorText: '#24211D',
    colorTextSecondary: '#6B645C',
    colorBorder: '#E7E3DD',
    colorBgContainer: '#FFFFFF',
    colorBgBase: '#FAF7F2',
    borderRadius: 8,
    fontFamily: '"Instrument Sans", "DM Sans", system-ui, sans-serif',
    controlHeight: 38,
  },
  components: {
    Form: {
      labelColor: '#24211D',
      labelFontSize: 15,
      verticalLabelPadding: '0 0 8px',
      itemMarginBottom: 0,
    },
    Input: {
      paddingInline: 12,
      paddingBlock: 8,
      hoverBorderColor: '#B4532D',
      activeBorderColor: '#B4532D',
      activeShadow: '0 0 0 2px #FAF7F2, 0 0 0 4px #B4532D',
    },
  },
};
