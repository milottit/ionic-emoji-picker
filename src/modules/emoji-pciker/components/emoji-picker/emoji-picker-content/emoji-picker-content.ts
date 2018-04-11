import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';

import { EmojiPickerList } from '../emoji-picker-list/emoji-picker-list';

import { Emoji } from '@services/emoji/emoji.service';
import { ByCategory } from '@model/emoji/collections';
import { EmojiOption } from '@services/emoji/emoji-option.service';
import { EmojiData } from '@model/emoji/emoji-data';
import { Category } from '@model/category/category';


import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';




@Component({
    selector: 'mt-emoji-picker-content',
    templateUrl: 'emoji-picker-content.html'
})
export class EmojiPickerContent {
    @ViewChild(EmojiPickerList) emojiPickerList: EmojiPickerList;
    @Output('mtEmojiSelection') emojiSelectionEmitter = new EventEmitter<EmojiData>();
    @Input('mtInputAutofocus') inputAutofocus: boolean;


    // private emojis: EmojisList;
    public filteredByCategory: ByCategory;
    public selected: EmojiData;
    // public emojisByCategory: ByCategory;

    // public emojisCategories: Array<CategoryMetadata>;
    // public categories: EmojiData[];

    constructor(public emoji: Emoji, public emojiOption: EmojiOption) {
        this.filteredByCategory = emojiOption.top.byCategory;
        // this.categories = emojiOption.top.categories;

        emoji.emojis$.subscribe(data => {
            this.filteredByCategory = data.byCategory;
        });
        // emoji.emojis$.subscribe(data => this.categories = data.categories);
    }



    public searchHandler(text: string) {
        if (text === '')
            this.filteredByCategory = this.emoji.emojis.byCategory;
        else {
            this.emoji.search$(text).subscribe(byCategory => {
                this.filteredByCategory = byCategory;
            });
        }
    }



    public categorySelectionHandler(category: Category) {
        this.emojiPickerList.selectCategory(category);
    }


    public emojiSelectedHandler(emoji: EmojiData) {
        this.selected = emoji;
        this.emojiSelectionEmitter.emit(emoji);
    }
}
