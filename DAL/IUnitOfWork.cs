// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public interface IUnitOfWork
    {
        /*ICustomerRepository Customers { get; }
        IProductRepository Products { get; }
        IOrdersRepository Orders { get; }*/
        IDeviceRepository Devices { get; }
        ITimeIntervalRepository TimeIntervals { get; }
        ILinkpoolRepository Linkpools { get; }
        IDeviceLinkpoolRepository DeviceLinkpools { get; }


        int SaveChanges();
    }
}
