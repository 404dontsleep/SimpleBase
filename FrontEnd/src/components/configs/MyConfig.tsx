import { useCallback, useEffect, useMemo, useState } from "react";
import View from "../layouts/View";
import UnitConfig, { NumberConfig, StringConfig } from "./UnitConfig";

export default function useConfigsHook(configs: {
  [key: string]: NumberConfig | StringConfig;
}) {
  const [values, setValues] = useState(configs);
  console.log(values);
  const handleValueChange = useCallback(
    (key: string, value: any) => {
      setValues({
        ...values,
        [key]: { ...values[key], value: value },
      });
    },
    [values]
  );
  useEffect(() => {
    console.log("a", configs);
  }, [configs]);
  const elements = useMemo(() => {
    return (
      <View>
        {Object.keys(configs).map((key) => (
          <UnitConfig
            key={key}
            config={values[key]}
            onValueChange={(value) => handleValueChange(key, value)}
          />
        ))}
      </View>
    );
  }, [configs, handleValueChange, values]);
  return { values, elements };
}
