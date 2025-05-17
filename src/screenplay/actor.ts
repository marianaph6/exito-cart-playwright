import { Ability } from "./abilities/ability";
import { Task } from "./tasks/task";

export class Actor {
  private abilities: Ability[] = [];

  private constructor(private name: string) {}

  static named(name: string): Actor {
    return new Actor(name);
  }

  whoCan(...abilities: Ability[]): Actor {
    this.abilities = abilities;
    return this;
  }

  async attemptsTo(...tasks: Task[]): Promise<void> {
    for (const task of tasks) {
      await task.performAs(this);
    }
  }

  abilityTo<T extends Ability>(abilityType: new (...args: any[]) => T): T {
    const ability = this.abilities.find((a) => a instanceof abilityType);
    if (!ability) {
      throw new Error(
        `Actor ${this.name} doesn't have the ability to ${abilityType.name}`
      );
    }
    return ability as T;
  }
}
