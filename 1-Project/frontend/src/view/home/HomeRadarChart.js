import React, { Component } from 'react';
import { Radar } from 'react-chartjs-2';
import { i18n } from 'i18n';

const data = {
  labels: [
    i18n('home.charts.eating'),
    i18n('home.charts.drinking'),
    i18n('home.charts.sleeping'),
    i18n('home.charts.designing'),
    i18n('home.charts.coding'),
    i18n('home.charts.cycling'),
    i18n('home.charts.running'),
  ],
  datasets: [
    {
      label: `${i18n('home.charts.customer')} 1`,
      backgroundColor: 'rgba(179,181,198,0.2)',
      borderColor: 'rgba(179,181,198,1)',
      pointBackgroundColor: 'rgba(179,181,198,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179,181,198,1)',
      data: [65, 59, 90, 81, 56, 55, 40],
    },
    {
      label: `${i18n('home.charts.customer')} 2`,
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: [28, 48, 40, 19, 96, 27, 100],
    },
  ],
};

export default class HomeRadarChart extends Component {
  render() {
    return <Radar data={data} />;
  }
}
