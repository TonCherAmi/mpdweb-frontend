import DatabaseItemLabel from '@app/labels/data/api/DatabaseItemLabel'

export const FAVORITE_DATABASE_ITEM_LABEL_DATA = {
  scope: '__internal',
  key: 'favorite',
  value: 'true',
} as const

export const isFavoriteDatabaseItemLabel = (databaseItemLabel: DatabaseItemLabel): boolean => {
  return databaseItemLabel.key === FAVORITE_DATABASE_ITEM_LABEL_DATA.key
    && databaseItemLabel.scope === FAVORITE_DATABASE_ITEM_LABEL_DATA.scope
}
