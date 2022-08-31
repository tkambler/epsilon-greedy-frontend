import { randomInt } from './util';
import { cloneDeep, orderBy } from 'lodash';
import moment from 'moment';

export type Option = {
  id: string;
  label: string;
  actualSuccessRate?: number;
  successRate?: number;
  attempts?: number;
  clicks?: number;
};

export type FormattedOption = {
  id: string;
  label: string;
  actualSuccessRate: number;
  successRate: number;
  attempts: number;
  clicks: number;
};

export class TestRunner {
  public runs = 0;
  public elapsedDays = 0;
  public options: FormattedOption[];
  public explorationPercentage: number;
  public chartData: any[] = [];

  public constructor({
    options = [],
    explorationPercentage = 10,
  }: {
    options: Option[];
    explorationPercentage: number;
  }) {
    this.options = options.map(this.formatOption);
    this.explorationPercentage = explorationPercentage;
  }

  public addOptions(options: Option[]) {
    const formatted: FormattedOption[] = options.map(this.formatOption);
    this.options.push(...formatted);
  }

  public modifyOption(id: string, option: Record<string, any>) {
    const currentOption = this.options.find((option) => option.id === id);
    if (!currentOption) {
      throw new Error(`Unknown option: ${id}`);
    }
    const idx = this.options.indexOf(currentOption);
    this.options[idx] = this.formatOption({
      id,
      ...currentOption,
      ...option,
    });
  }

  public run(date: moment.Moment, executions: number) {
    for (let i = 0; i < executions; i++) {
      this.execute(date);
    }
  }

  private formatOption = (option: Option): FormattedOption => {
    return {
      ...option,
      successRate:
        typeof option.successRate === 'undefined' ? 100 : option.successRate,
      actualSuccessRate: 0,
      attempts: 0,
      clicks: 0,
    };
  };

  private execute(date: moment.Moment) {
    if (randomInt(1, 100 / this.explorationPercentage) === 1) {
      this.explore(date);
    } else {
      this.exploit(date);
    }
  }

  /**
   * Choose a random option.
   */
  private explore(date: moment.Moment) {
    const option = this.getRandomOption();
    const didClick = this.didClick(option);
    option.attempts++;
    if (didClick) {
      option.clicks++;
    }
    this.calculateOptionSuccessRate(option);
    this.updateChartData(date);
    this.runs++;
  }

  /**
   * Choose the best performing option.
   */
  private exploit(date: moment.Moment) {
    const option = this.getBestOption();
    const didClick = this.didClick(option);
    option.attempts++;
    if (didClick) {
      option.clicks++;
    }
    this.calculateOptionSuccessRate(option);
    this.updateChartData(date);
    this.runs++;
  }

  private updateChartData(date: moment.Moment) {
    const today = (() => {
      let match = this.chartData.find((row) => row.date.isSame(date));
      if (match) {
        return match;
      }
      match = {
        date: date.clone(),
        data: [],
      };
      this.chartData.push(match);
      return match;
    })();
    for (const option of this.options) {
      today.data.push(cloneDeep(option));
    }
  }

  private getRandomOption(): FormattedOption {
    return this.options[randomInt(0, this.options.length - 1)];
  }

  private didClick(option: FormattedOption) {
    return randomInt(1, 100 / option.successRate) === 1;
  }

  private calculateOptionSuccessRate(option: FormattedOption) {
    option.actualSuccessRate = Math.round(
      (option.clicks / option.attempts) * 100
    );
  }

  public getBestOption() {
    return orderBy(this.options, ['actualSuccessRate'], ['desc'])[0];
  }
}
