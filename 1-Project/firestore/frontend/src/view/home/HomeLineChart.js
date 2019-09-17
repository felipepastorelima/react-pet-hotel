import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { i18n } from 'i18n';

const data = {
  labels: [
    i18n('home.charts.months.1'),
    i18n('home.charts.months.2'),
    i18n('home.charts.months.3'),
    i18n('home.charts.months.4'),
    i18n('home.charts.months.5'),
    i18n('home.charts.months.6'),
    i18n('home.charts.months.7'),
  ],
  datasets: [
    {
      label: i18n('home.charts.visitor'),
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

export default class HomeLineChart extends Component {
  render() {
    return <Line data={data} />;
  }
}
