using System.Collections.Generic;
using DAL.Models;

namespace DAL.Repositories.Interfaces
{
    public interface IDeviceRepository : IRepository<Device>
    {
        //IEnumerable<Device> GetAll4LP();
        IEnumerable<Device> Get4CurrentLP(int linkpoolId);
    }
}