export interface Attachment {
  id?: string | number
  name?: string
  url: string
  ext?: string
  mediaType?: string | null
  createdAt?: string | Date
}

export interface TempFiles {
  size?: number
  name?: string
  id?: string
  tempUrl?: string
}
