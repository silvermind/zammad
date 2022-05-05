// Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

import mainInitializeForm, { getFormPlugins } from '@shared/form'
import type {
  FormFieldTypeImportModules,
  FormThemeExtension,
  InitializeAppForm,
} from '@shared/types/form'
import type { ImportGlobEagerOutput } from '@shared/types/utils'
import type { FormKitPlugin } from '@formkit/core'
import getCoreClasses from '@mobile/form/theme/global'
import { App } from 'vue'

const pluginModules: ImportGlobEagerOutput<FormKitPlugin> =
  import.meta.globEager('./plugins/global/*.ts')
const fieldModules: ImportGlobEagerOutput<FormFieldTypeImportModules> =
  import.meta.globEager('../components/Form/fields/**/index.ts')
const themeExtensionModules: ImportGlobEagerOutput<FormThemeExtension> =
  import.meta.globEager('./theme/global/extensions/*.ts')

const initializeForm: InitializeAppForm = (app: App) => {
  const plugins = getFormPlugins(pluginModules)
  const theme = {
    coreClasses: getCoreClasses,
    extensions: themeExtensionModules,
  }

  mainInitializeForm(app, undefined, fieldModules, plugins, theme)
}

export default initializeForm
