// UrlPoolModel instead UrlPoolModel
export class UrlPoolModel {
  linkpoolId: number;
  poolName: string;
  linkPath: string;

  constructor(linkpoolId?: number, poolName?: string, linkPath?: string) {
    this.linkpoolId = linkpoolId;
    this.poolName = poolName;
    this.linkPath = linkPath;

  }
}
