import React, { Component } from 'react';
import { Polar } from 'react-chartjs-2';
import { i18n } from 'i18n';

const data = {
  datasets: [
    {
      data: [11, 16, 7, 3, 14],
      backgroundColor: [
        '#FF6384',
        '#4BC0C0',
        '#FFCE56',
        '#E7E9ED',
        '#36A2EB',
      ],
    },
  ],
  labels: [
    i18n('home.charts.red'),
    i18n('home.charts.green'),
    i18n('home.charts.yellow'),
    i18n('home.charts.grey'),
    i18n('home.charts.blue'),
  ],
};

export default class HomePolarChart extends Component {
  render() {
    return <Polar data={data} />;
  }
}
