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
  get isEmpty(): boolean {
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
  reset(items: unknown[]) {
    this.setItemCount(items.length)

    const index = R.isEmpty(items) ? -1 : 0

    this.setCurrentItemIndex(index)
  }

  @action
  setCurrentItemIndex(currentItemIndex: number) {
    this.item.currentIndex = currentItemIndex
  }

  @action
  private setItemCount(count: number) {
    this.item.count = count
  }
}

export default ItemNavigationStore
