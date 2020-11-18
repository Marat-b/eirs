using System.Collections.Generic;
using System.Linq;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class DevicesRepository: Repository<Device>, IDeviceRepository
    {
        public DevicesRepository(DbContext context) : base(context)
        {
        }
        
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
        
        /// <summary>
        /// Get all devices for link pool
        /// </summary>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        /*public IEnumerable<Device> GetAll4LP()
        {
            var devices = _appContext.Devices.AsEnumerable();
            return devices;
        }*/

        public IEnumerable<Device> Get4CurrentLP(int linkpoolId)
        {
            var devices = _appContext.Devices.Where(a =>
                _appContext.DeviceLinkPools.Where(w => w.LinkpoolId == linkpoolId).Select(s => s.DeviceId)
                    .Union(_appContext.Devices.Select(d => d.Id)
                        .Except(_appContext.DeviceLinkPools.Select(l => l.DeviceId))).Contains(a.Id)).AsEnumerable();
            return devices;
        }
    }
}