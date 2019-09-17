import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { i18n } from 'i18n';

const data = {
  labels: [
    i18n('home.charts.months.1'),
    i18n('home.charts.months.2'),
    i18n('home.charts.months.3'),
    i18n('home.charts.months.4'),
    i18n('home.charts.months.5'),
    i18n('home.charts.months.6'),
  ],
  datasets: [
    {
      label: i18n('home.charts.sales'),
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

export default class HomeHorizontalBarChart extends Component {
  render() {
    return <HorizontalBar data={data} />;
  }
}
