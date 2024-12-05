import { Input, Slider } from "antd";

type UnitConfig<T, U extends string> = {
  value: T;
  type: U;
};
type NumberConfig = UnitConfig<number, "number"> & {
  min?: number;
  max?: number;
};
type StringConfig = UnitConfig<string, "string">;
const MyConfig = <K extends NumberConfig | StringConfig>({
  config,
  onValueChange,
}: {
  config: K;
  onValueChange: (value: K["value"]) => void;
}) => {
  if (config.type === "number") {
    return (
      <Slider
        min={config.min}
        max={config.max}
        value={config.value}
        onChange={(value) => onValueChange(value)}
      />
    );
  }
  if (config.type === "string") {
    return (
      <Input
        value={config.value}
        onChange={(e) => onValueChange(e.target.value)}
      />
    );
  }
  return <>Unknow</>;
};

export default MyConfig;

export type { NumberConfig, StringConfig };
