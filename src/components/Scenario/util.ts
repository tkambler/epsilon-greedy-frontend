export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const baseOptions: any = {
  chart: {
    height: 350,
    type: 'line',
    dropShadow: {
      enabled: false,
      color: '#000',
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2,
    },
    toolbar: {
      show: false,
    },
  },
  colors: ['#1858F5', '#F5B017', '#18F524'],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  grid: {
    borderColor: '#e7e7e7',
    row: {
      colors: ['#f3f3f3', 'transparent'],
      opacity: 0.5,
    },
  },
  markers: {
    size: 0,
  },
  xaxis: {
    type: 'datetime',
    title: {
      text: 'Date',
    },
  },
  yaxis: {
    title: {
      text: 'Success Rate',
    },
    min: 0,
    max: 100,
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    floating: true,
    offsetY: -25,
    offsetX: -5,
  },
};
