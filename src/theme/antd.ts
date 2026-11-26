import type { ThemeConfig } from 'antd';

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#B4532D',
    colorLink: '#B4532D',
    colorInfo: '#B4532D',
    colorError: '#964322',
    colorText: '#24211D',
    colorTextSecondary: '#6B645C',
    colorTextPlaceholder: '#948B80',
    colorBorder: '#E7E3DD',
    colorBgContainer: '#FFFFFF',
    borderRadius: 8,
    fontFamily: 'Instrument Sans, sans-serif',
    fontSize: 15,
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
