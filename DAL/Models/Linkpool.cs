using System.Collections.Generic;

namespace DAL.Models
{
    public class Linkpool
    {
        public int LinkpoolId { get; set; }
        public string PoolName { get; set; }
        public string LinkPath { get; set; }
        
        public List<DeviceLinkpool> DeviceLinkpools { get; set; }
    }
}