import { isPlatformBrowser } from '@angular/common';
import {
  inject,
  Inject,
  Injectable,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {
  private readonly _renderer2 = inject(RendererFactory2).createRenderer(
    null,
    null
  );

  constructor(
    private _translateService: TranslateService,
    @Inject(PLATFORM_ID) private id: object
  ) {
    if (isPlatformBrowser(this.id)) {
      this._translateService.setDefaultLang('en');

      const saveLang = localStorage.getItem('lang');

      if (saveLang) {
        this._translateService.use(saveLang);
      }

      this.changeDirection();
    }
  }

  changeDirection(): void {
    if (localStorage.getItem('lang') === 'en') {
      this._renderer2.setAttribute(document.documentElement, 'dir', 'ltr');
      this._renderer2.setAttribute(document.documentElement, 'lang', 'en');
    } else if (localStorage.getItem('lang') === 'ar') {
      this._renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
      this._renderer2.setAttribute(document.documentElement, 'lang', 'ar');
    }
  }

  changeLangTranslate(lang: string): void {
    localStorage.setItem('lang', lang);
    this._translateService.use(lang);
    this.changeDirection();
  }
}
