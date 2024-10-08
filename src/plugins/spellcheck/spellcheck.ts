/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2024 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

/**
 * [[include:plugins/spellcheck/README.md]]
 * @packageDocumentation
 * @module plugins/spellcheck
 */

import type { IJodit } from 'jodit/types';
import { autobind } from 'jodit/core/decorators';
import { extendLang, pluginSystem } from 'jodit/core/global';
import { attr } from 'jodit/core/helpers/utils/attr';
import { Plugin } from 'jodit/core/plugin';
import { fuze_pages } from 'jodit/jodit.ts';

import './config';

import * as langs from './langs';

export class spellcheck extends Plugin {
	override buttons: Plugin['buttons'] = [
		{
			group: 'state',
			name: 'spellcheck'
		}
	];

	constructor(jodit: IJodit) {
		super(jodit);
		extendLang(langs);
	}

	protected afterInit(jodit: IJodit): void {
		jodit.e.on(
			'afterInit afterAddPlace prepareWYSIWYGEditor',
			this.toggleSpellcheck
		);
		this.toggleSpellcheck();

		jodit.registerCommand('toggleSpellcheck', () => {
			this.jodit.o.spellcheck = !this.jodit.o.spellcheck;
			this.toggleSpellcheck();
			this.j.e.fire('updateToolbar');
		});
	}

	@autobind
	private toggleSpellcheck(): void {
		// attr(this.jodit.editor, 'spellcheck', this.jodit.o.spellcheck);
		console.log(fuze_pages);
		for (let page of fuze_pages.pages) {
			console.log(page);
			attr(page.content, "spellcheck", this.jodit.o.spellcheck);
		}
		attr(fuze_pages.single_page, "spellcheck", this.jodit.o.spellcheck);
	}

	protected beforeDestruct(jodit: IJodit): void {}
}

pluginSystem.add('spellcheck', spellcheck);
