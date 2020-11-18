using System;
using System.Diagnostics;
using System.Text;

namespace QuickApp.ViewModels
{
    public class DeviceViewModel
    {
        private byte[] _screenshot;
        public int Id { get; set; }
        
        /// <summary>
        /// Location of device
        /// </summary>
        public string CityAddress { get; set; }
        /// <summary>
        /// IpAddress of device 
        /// </summary>
        public string IpAddress { get; set; }
        /// <summary>
        /// Whether it's on ?
        /// </summary>
        public bool IsActive { get; set; }
        /// <summary>
        /// Monitor checking 
        /// </summary>
        public bool IsMonitor { get; set; }
        /// <summary>
        /// Online checking
        /// </summary>
        public bool IsOnline { get; set; }
        /// <summary>
        /// Last updating information about device
        /// </summary>
        public DateTimeOffset LastUpdate { get; set; }
        /// <summary>
        /// Name of movie
        /// </summary>
        public string Movie { get; set; }
        /// <summary>
        /// Name of device
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Processor's temperature of device
        /// </summary>
        public decimal Temperature { get; set; }
        /// <summary>
        /// Device's screenshot
        /// </summary>
        public  string Screenshot { get; set; }
        /// <summary>
        /// Sound's volume
        /// </summary>
        public  int Volume { get; set; }

        
    }
}