import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "temperature",
  standalone: true,
})
export class TemperaturePipe implements PipeTransform {
  transform(value: string | number, inputUnit: "C" | "F", outputUnit: "C" | "F"): string {
    let val: number;
    if (typeof value === 'string') {
      val = parseFloat(value);
    }
    else {
      val = value;
    }

    let outputTemperature: number;
    if (inputUnit === "C" && outputUnit === "F") {
      outputTemperature = val * (9/5) + 32;
    } else if (inputUnit === "F" && outputUnit === "C") {
      outputTemperature = (val - 32) * (5/9);
    } else {
      outputTemperature = val;
    }

    return `${outputTemperature.toFixed(2)} °${outputUnit}`;
  }
}
