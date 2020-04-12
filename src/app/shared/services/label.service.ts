import {Injectable} from "@angular/core";

@Injectable()
export class LabelService {
  labels = {
  };

  get(key: string): string {
    return this.labels[key];
  };
}
