import {
  EnvironmentProviders,
  isDevMode,
  makeEnvironmentProviders,
} from '@angular/core';
import { provideTransloco } from '@ngneat/transloco';
import { TranslocoHttpLoader } from './loader';

export function provideTranslate(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideTransloco({
      config: {
        availableLangs: ['en'],
        defaultLang: 'en',
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
  ]);
}
