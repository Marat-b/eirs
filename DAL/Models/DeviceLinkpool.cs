using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class DeviceLinkpool
    {
        
        //public int DeviceLinkpoolId { get; set; }
        public int DeviceId { get; set; }
        public Device Device { get; set; }
        public int LinkpoolId { get; set; }
        public Linkpool Linkpool { get; set; }
    }
}