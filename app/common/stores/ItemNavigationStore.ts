import { action, computed, observable } from 'mobx'

import * as R from 'ramda'

class ItemNavigationStore {
  @observable
  item = {
    count: 0,
    currentIndex: 0
  }

  constructor(items: unknown[] = []) {
    this.setItemCount(items.length)
  }

  @computed
  private get isAtFirstItem(): boolean {
    return R.lte(this.currentItemIndex, 0)
  }

  @computed
  private get isAtLastItem(): boolean {
    return R.equals(this.currentItemIndex, R.dec(this.itemCount))
  }

  @computed
  private get isEmpty(): boolean {
    return R.equals(this.itemCount, 0)
  }

  @computed
  get itemCount(): number {
    return this.item.count
  }

  @computed
  get currentItemIndex(): number {
    return this.item.currentIndex
  }

  @computed
  get isInInitialPosition(): boolean {
    return R.equals(this.currentItemIndex, -1)
  }

  @action
  goToNextItem() {
    if (!this.isAtLastItem) {
      this.setCurrentItemIndex(
        R.inc(this.currentItemIndex)
      )
    }
  }

  @action
  goToPrevItem() {
    if (!this.isAtFirstItem) {
      this.setCurrentItemIndex(
        R.dec(this.currentItemIndex)
      )
    }
  }

  @action
  goToFirstItem() {
    if (!this.isEmpty) {
      this.setCurrentItemIndex(0)
    }
  }

  @action
  goToLastItem() {
    if (!this.isEmpty) {
      this.setCurrentItemIndex(
        R.dec(this.itemCount)
      )
    }
  }

  @action
  setItems(items: unknown[]) {
    this.setItemCount(items.length)
    this.setCurrentItemIndex(-1)
  }

  @action
  private setItemCount(count: number) {
    this.item.count = count
  }

  @action
  private setCurrentItemIndex(currentItemIndex: number) {
    this.item.currentIndex = currentItemIndex
  }
}

export default ItemNavigationStore
