import * as React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { TestRunner } from './TestRunner';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';
import { baseOptions } from './util';

export function Scenario1(): React.ReactElement {
  const [series, setSeries] = React.useState<any>(null);
  const [options, setOptions] = React.useState<any>(null);

  React.useEffect(() => {
    const runner = new TestRunner({
      explorationPercentage: 10,
      options: [
        {
          id: 'blue',
          label: 'Blue',
          successRate: 15,
        },
        {
          id: 'orange',
          label: 'Orange',
          successRate: 10,
        },
        {
          id: 'green',
          label: 'Green',
          successRate: 75,
        },
      ],
    });

    let today = moment().subtract(1, 'days');

    for (let i = 0; i < 200; i++) {
      today = today.add(1, 'days');
      if (i < 100) {
        runner.run(today, 10);
      } else {
        runner.run(today, 100);
      }
    }

    setSeries(
      runner.options.map((option) => ({
        name: option.label,
        data: (() => {
          const result = [];
          for (const row of runner.chartData) {
            row.data.reverse();
            const match = row.data.find((r) => r.label === option.label);
            row.data.reverse();
            result.push(match.actualSuccessRate);
          }
          return result;
        })(),
      }))
    );

    setOptions({
      ...baseOptions,
      xaxis: {
        ...baseOptions.xaxis,
        categories: (() => {
          const result: number[] = [];
          for (const row of runner.chartData) {
            result.push(row.date.toDate().getTime());
          }
          return result;
        })(),
      },
    });
  }, []);

  return (
    <div>
      <Paper
        style={{
          padding: 10,
          marginTop: 15,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Scenario One
        </Typography>
        <div style={{ padding: 10 }}>
          <p>
            A test is run for two hundred days during which time users are presented
            with three buttons: Blue, Orange, and Green. The goal of the test is
            to determine which button users are most likely to click. While we
            do not know this at the outset, the performance of each button is as
            follows:
          </p>
          <ul
            style={{
              padding: 15,
            }}
          >
            <li>Blue - Users will click 15% of the time.</li>
            <li>Orange - Users will click 10% of the time.</li>
            <li>Green - Users will click 75% of the time.</li>
          </ul>
          <p>
            For the first one hundred days in this scenario, we render ten page views each day. After that, daily page views are increased to 100. At the outset, each button is equally-weight with an "actual success rate" of 0%. When a button is rendered to our users, 90% of the time we display the button that we have determined to have the highest rate of success. The remaining 10% of the time we display a random button. When a button is clicked, we update that button's calculated success rate.
          </p>
        </div>
        <Typography variant="body1" gutterBottom></Typography>
        <Typography variant="body1" gutterBottom></Typography>
        {series && options && (
          <ReactApexChart
            options={options}
            series={series}
            type="line"
            height={450}
          />
        )}
      </Paper>
    </div>
  );
}

export function Scenario2(): React.ReactElement {
  const [series, setSeries] = React.useState<any>(null);
  const [options, setOptions] = React.useState<any>(null);

  React.useEffect(() => {
    const runner = new TestRunner({
      explorationPercentage: 10,
      options: [
        {
          id: 'blue',
          label: 'Blue',
          successRate: 15,
        },
        {
          id: 'orange',
          label: 'Orange',
          successRate: 10,
        },
        {
          id: 'green',
          label: 'Green',
          successRate: 75,
        },
      ],
    });

    let today = moment().subtract(1, 'days');

    for (let i = 0; i < 100; i++) {
      today = today.add(1, 'days');
      runner.run(today, 100);
    }

    runner.modifyOption('green', {
      successRate: 15,
    });

    runner.modifyOption('orange', {
      successRate: 90,
    });

    for (let i = 0; i < 100; i++) {
      today = today.add(1, 'days');
      runner.run(today, 100);
    }

    setSeries(
      runner.options.map((option) => ({
        name: option.label,
        data: (() => {
          const result = [];
          for (const row of runner.chartData) {
            row.data.reverse();
            const match = row.data.find((r) => r.label === option.label);
            row.data.reverse();
            result.push(match.actualSuccessRate);
          }
          return result;
        })(),
      }))
    );

    setOptions({
      ...baseOptions,
      xaxis: {
        ...baseOptions.xaxis,
        categories: (() => {
          const result: number[] = [];
          for (const row of runner.chartData) {
            result.push(row.date.toDate().getTime());
          }
          return result;
        })(),
      },
    });
  }, []);

  return (
    <div>
      <Paper
        style={{
          padding: 10,
          marginTop: 15,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Scenario Two
        </Typography>
        <div style={{ padding: 10 }}>
          <p>
            A test is run for two hundred days during which time users are presented
            with three buttons: Blue, Orange, and Green. The goal of the test is
            to determine which button users are most likely to click. While we
            do not know this at the outset, the performance of each button is as
            follows:
          </p>
          <ul
            style={{
              padding: 15,
            }}
          >
            <li>Blue - Users will click 15% of the time.</li>
            <li>Orange - Users will click 10% of the time.</li>
            <li>Green - Users will click 75% of the time.</li>
          </ul>
          <p>
            Halfway through the test, the performance characteristics of the
            buttons changes. Suddenly, the green button's performance drops,
            while the orange button's performance surges.
          </p>
          <ul
            style={{
              padding: 15,
            }}
          >
            <li>Blue - Users will click 15% of the time.</li>
            <li>Orange - Users will click 90% of the time.</li>
            <li>Green - Users will click 15% of the time.</li>
          </ul>
        </div>
        {series && options && (
          <ReactApexChart
            options={options}
            series={series}
            type="line"
            height={450}
          />
        )}
      </Paper>
    </div>
  );
}
