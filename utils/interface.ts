export interface Report {
  time: string
  status: "success" | "failed"
}

export interface Url {
  id: string /* primary key */
  url: string
  title: string
  description?: string
}

export interface Log {
  id: string /* primary key */
  url_id?: string /* foreign key to urls.id */
  time: string
  status: string
  urls?: Url[]
}

export interface Incident {
  id: string /* primary key */
  url_id?: string /* foreign key to urls.id */
  created_at: string
  resolved?: boolean
  content?: string
  urls?: Url
}
