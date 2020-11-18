// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Repositories;
using DAL.Repositories.Interfaces;

namespace DAL
{
    public class UnitOfWork : IUnitOfWork
    {
        readonly ApplicationDbContext _context;

        /*ICustomerRepository _customers;
        IProductRepository _products;
        IOrdersRepository _orders;*/
        IDeviceRepository _devices;
        ITimeIntervalRepository _timeIntervals;
        ILinkpoolRepository _linkpools;
        IDeviceLinkpoolRepository _deviceLinkpools;



        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }



        /*public ICustomerRepository Customers
        {
            get
            {
                if (_customers == null)
                    _customers = new CustomerRepository(_context);

                return _customers;
            }
        }



        public IProductRepository Products
        {
            get
            {
                if (_products == null)
                    _products = new ProductRepository(_context);

                return _products;
            }
        }



        public IOrdersRepository Orders
        {
            get
            {
                if (_orders == null)
                    _orders = new OrdersRepository(_context);

                return _orders;
            }
        }*/

        public IDeviceRepository Devices
        {
            get
            {
                if (_devices==null)
                    _devices=new DevicesRepository(_context);

                return _devices;
            }
        }
        
        public ITimeIntervalRepository TimeIntervals
        {
            get
            {
                if (_timeIntervals==null)
                    _timeIntervals=new TimeIntervalRepository(_context);

                return _timeIntervals;
            }
        }

        public ILinkpoolRepository Linkpools
        {
            get
            {
                if (_linkpools==null)
                    _linkpools=new LinkpoolRepository(_context);
                return _linkpools;
            }
        }

        public IDeviceLinkpoolRepository DeviceLinkpools
        {
            get
            {
                if (_deviceLinkpools==null)
                    _deviceLinkpools=new DeviceLinkpoolRepository(_context);
                return _deviceLinkpools;
            }
        }


        public int SaveChanges()
        {
            return _context.SaveChanges();
        }
    }
}
