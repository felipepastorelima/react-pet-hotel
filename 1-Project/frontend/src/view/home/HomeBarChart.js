import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { i18n } from 'i18n';

const data = {
  labels: [
    `${i18n('home.charts.day')} 1`,
    `${i18n('home.charts.day')} 2`,
    `${i18n('home.charts.day')} 3`,
    `${i18n('home.charts.day')} 4`,
    `${i18n('home.charts.day')} 5`,
  ],
  datasets: [
    {
      label: i18n('home.charts.sales'),
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 82],
    },
  ],
};

export default class HomeBarChart extends Component {
  render() {
    return <Bar data={data} width={100} height={50} />;
  }
}
