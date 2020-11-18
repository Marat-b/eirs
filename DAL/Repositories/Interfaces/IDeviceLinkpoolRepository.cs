using System.Collections.Generic;
using DAL.Models;

namespace DAL.Repositories.Interfaces
{
    public interface IDeviceLinkpoolRepository: IRepository<DeviceLinkpool>
    {
        void UpdateAll(int linkpoolId, IEnumerable<int> devices);
        IEnumerable<int> GetDevicesId(int linkPoolId);
    }
}