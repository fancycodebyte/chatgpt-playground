import React, { FC } from "react";
import ReSelect, { StylesConfig } from "react-select";
import styles from "./styles.module.css";
import { useRootContext } from "@/context/RootContext";

interface Props {
  label: string;
}

interface GroupedOption {
  readonly label: string;
  readonly options: readonly any[] | readonly any[];
}

const Select: FC<Props> = ({ label }) => {
  const { updateConfig } = useRootContext();

  const options = [
    { value: "gpt-3.5-turbo", label: "gpt-3.5-turbo" },
    { value: "gpt-3.5-turbo-0301", label: "gpt-3.5-turbo-0301" }
  ];

  const groupedOptions: readonly GroupedOption[] = [
    {
      label: "Chat",
      options: options
    }
  ];

  const style: StylesConfig<GroupedOption, false, any> | undefined = {
    control: (base, state) => ({
      ...base,
      borderColor: "#C5C5D2",
      height: "35px",
      minHeight: "35px",
      borderRadius: "4px",
      background: "white",
      fontSize: "13px",
      color: "#353740",
      boxShadow: state.isFocused ? "0" : "0",
      "&:hover": {
        borderColor: "#10a37f",
        boxShadow: "0 !important"
      },
      "&:focus": {
        borderColor: "#10a37f",
        boxShadow: "0 !important"
      },
      "&:focus-visible": {
        borderColor: "#10a37f",
        boxShadow: "0 !important"
      }
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "35px",
      padding: "0 6px"
    }),
    indicatorSeparator: (state) => ({
      display: "none"
    }),
    indicatorsContainer: (base) => ({
      ...base,
      height: "35px"
    }),
    singleValue: (props) => ({
      ...props,
      marginBottom: "2px"
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? "#10a37f" : "white",
      color: state.isSelected ? "white" : "#565869",
      padding: "6px 12px",
      fontSize: "14px",
      lineHeight: "20px",
      cursor: "pointer",
      ":active": {
        backgroundColor: state.isSelected ? "#10a37f" : "#eff7f8"
      }
    }),
    menu: (base) => ({
      ...base,
      width: "250px",
      right: "0px"
    })
  };

  const formatGroupLabel = (data: any) => (
    <div className={styles.selectDropdownLabel}>{data.label}</div>
  );

  return (
    <div>
      <p className={styles.label}>{label}</p>
      <ReSelect
        defaultValue={groupedOptions[0].options[0]}
        styles={style}
        options={groupedOptions}
        formatGroupLabel={formatGroupLabel}
        components={{ IndicatorSeparator: null }}
        placeholder="Select model"
        menuPlacement="auto"
        onChange={(e) => updateConfig({ model: e.value })}
      />
    </div>
  );
};

export default Select;
