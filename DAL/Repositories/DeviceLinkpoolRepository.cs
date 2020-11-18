using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class DeviceLinkpoolRepository: Repository<DeviceLinkpool>, IDeviceLinkpoolRepository
    {
        public  DeviceLinkpoolRepository(DbContext context) : base(context)
        {}
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
        
        public void UpdateAll(int linkpoolId,  IEnumerable<int> devices)
        {
            #if DEBUG
            Debug.WriteLine("UpdateAll linkpoolId=" + linkpoolId.ToString());
            if (devices!=null)
                Debug.WriteLine("UpdateAll device count=" + devices.Count().ToString());
            else
            {
                Debug.WriteLine("UpdateAll devices is null");
            }
            #endif
            //throw new System.NotImplementedException();
            //int linkpoolId = devices.Select(s => s.LinkpoolId).SingleOrDefault();
            var contextDevices = _appContext.DeviceLinkPools.Where(w => w.LinkpoolId == linkpoolId).AsEnumerable();
            if (contextDevices==null)
                contextDevices=new List<DeviceLinkpool>();
                
            //var deviceIds = devices.Se
            var toDeleteDevices = contextDevices.Select(s => s.DeviceId).Except<int>(devices).ToArray();
            var toAddDevices = devices.Except(contextDevices.Select(s => s.DeviceId)).ToArray();

            if (toDeleteDevices.Any())
            {
                foreach (var toDeleteDevice in toDeleteDevices)
                {
                    var deletedDevice = _appContext.DeviceLinkPools.Where(w => w.LinkpoolId == linkpoolId)
                        .FirstOrDefault(f => f.DeviceId == toDeleteDevice);
                    if (deletedDevice != null)
                    {
                        _appContext.DeviceLinkPools.Remove(deletedDevice);
                        _appContext.SaveChanges();
                    }
                }
            }

            if (toAddDevices.Any())
            {
                foreach (var toAddDevice in toAddDevices)
                {
                    _appContext.DeviceLinkPools.Add(new DeviceLinkpool()
                    {
                        DeviceId = toAddDevice,
                        LinkpoolId = linkpoolId
                    });
                }

                _appContext.SaveChanges();
            }
        }

        public IEnumerable<int> GetDevicesId(int linkPoolId)
        {
            var devicesId =
                _appContext.DeviceLinkPools.Where(w => w.LinkpoolId == linkPoolId).Select(s => s.DeviceId);

            return devicesId;

        }
    }
}