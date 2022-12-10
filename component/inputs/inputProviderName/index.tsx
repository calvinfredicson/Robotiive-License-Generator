import { useMemo } from "react"
import { InputSelectProviderName } from "./inputSelectProviderName"

export interface InputProviderNameProps extends ReactHookForm.Controller {
  companyList: License.API.Company[]
}

export enum Language {
  CH = "Chinese",
  EN = "English",
}

export const InputProviderName: React.FC<InputProviderNameProps> = ({
  companyList,
  ...props
}) => {
  const providerList = useMemo(
    () => [
      ...companyList,
      {
        "Company Chinese Name": "伊斯酷軟體科技",
        "Company English Name": "IsCoolLab",
      },
    ],
    [companyList]
  )

  console.log(providerList)
  return (
    <>
      <InputSelectProviderName
        language={Language.CH}
        providerList={providerList}
        label="Select Chinese Provider"
        {...props}
      />
      <InputSelectProviderName
        language={Language.EN}
        providerList={providerList}
        label="Select English Provider"
        {...props}
      />
    </>
  )
}
