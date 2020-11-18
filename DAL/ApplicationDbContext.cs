// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

using DAL.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using DAL.Models.Interfaces;

namespace DAL
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public string CurrentUserId { get; set; }
        /*public DbSet<Customer> Customers { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }*/
        public DbSet<Device> Devices { get; set; }
        public DbSet<TimeInterval> TimeIntervals { get; set; }
        public DbSet<Linkpool> LinkPools { get; set; }
        public DbSet<DeviceLinkpool> DeviceLinkPools { get; set; }



        public ApplicationDbContext(DbContextOptions options) : base(options)
        { }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            const string priceDecimalType = "decimal(18,2)";
            const string imageType = "varchar(max)";

            builder.Entity<ApplicationUser>().HasMany(u => u.Claims).WithOne().HasForeignKey(c => c.UserId).IsRequired().OnDelete(DeleteBehavior.Cascade);
            builder.Entity<ApplicationUser>().HasMany(u => u.Roles).WithOne().HasForeignKey(r => r.UserId).IsRequired().OnDelete(DeleteBehavior.Cascade);

            builder.Entity<ApplicationRole>().HasMany(r => r.Claims).WithOne().HasForeignKey(c => c.RoleId).IsRequired().OnDelete(DeleteBehavior.Cascade);
            builder.Entity<ApplicationRole>().HasMany(r => r.Users).WithOne().HasForeignKey(r => r.RoleId).IsRequired().OnDelete(DeleteBehavior.Cascade);

            /*builder.Entity<Customer>().Property(c => c.Name).IsRequired().HasMaxLength(100);
            builder.Entity<Customer>().HasIndex(c => c.Name);
            builder.Entity<Customer>().Property(c => c.Email).HasMaxLength(100);
            builder.Entity<Customer>().Property(c => c.PhoneNumber).IsUnicode(false).HasMaxLength(30);
            builder.Entity<Customer>().Property(c => c.City).HasMaxLength(50);
            builder.Entity<Customer>().ToTable($"App{nameof(this.Customers)}");

            builder.Entity<ProductCategory>().Property(p => p.Name).IsRequired().HasMaxLength(100);
            builder.Entity<ProductCategory>().Property(p => p.Description).HasMaxLength(500);
            builder.Entity<ProductCategory>().ToTable($"App{nameof(this.ProductCategories)}");

            builder.Entity<Product>().Property(p => p.Name).IsRequired().HasMaxLength(100);
            builder.Entity<Product>().HasIndex(p => p.Name);
            builder.Entity<Product>().Property(p => p.Description).HasMaxLength(500);
            builder.Entity<Product>().Property(p => p.Icon).IsUnicode(false).HasMaxLength(256);
            builder.Entity<Product>().HasOne(p => p.Parent).WithMany(p => p.Children).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Product>().ToTable($"App{nameof(this.Products)}");
            builder.Entity<Product>().Property(p => p.BuyingPrice).HasColumnType(priceDecimalType);
            builder.Entity<Product>().Property(p => p.SellingPrice).HasColumnType(priceDecimalType);

            builder.Entity<Order>().Property(o => o.Comments).HasMaxLength(500);
            builder.Entity<Order>().ToTable($"App{nameof(this.Orders)}");
            builder.Entity<Order>().Property(p => p.Discount).HasColumnType(priceDecimalType);

            builder.Entity<OrderDetail>().ToTable($"App{nameof(this.OrderDetails)}");
            builder.Entity<OrderDetail>().Property(p => p.UnitPrice).HasColumnType(priceDecimalType);
            builder.Entity<OrderDetail>().Property(p => p.Discount).HasColumnType(priceDecimalType);*/

            builder.Entity<Device>().ToTable($"App{nameof(this.Devices)}");
            builder.Entity<Device>().Property(c => c.Name).HasMaxLength(100);
            builder.Entity<Device>().Property(c => c.CityAddress).HasMaxLength(100);
            builder.Entity<Device>().Property(c => c.IpAddress).HasMaxLength(50);
            builder.Entity<Device>().Property(c => c.Movie).HasMaxLength(100);
            builder.Entity<Device>().Property(c => c.Temperature).HasColumnType(priceDecimalType).HasDefaultValue(0);
            builder.Entity<Device>().Property(c => c.LastUpdate).HasDefaultValueSql("getutcdate()");
            builder.Entity<Device>().Property(c => c.IsActive).HasDefaultValue(false);
            builder.Entity<Device>().Property(c => c.IsMonitor).HasDefaultValue(false);
            builder.Entity<Device>().Property(c => c.IsOnline).HasDefaultValue(false);
            builder.Entity<Device>().Property(c => c.Screenshot).HasColumnType(imageType);
            builder.Entity<Device>().Property(c => c.Volume).HasDefaultValue(0);
            
            
            builder.Entity<TimeInterval>().ToTable($"App{nameof(this.TimeIntervals)}");
            builder.Entity<TimeInterval>().Property(c => c.Interval).HasDefaultValue(600000).IsRequired();
            builder.Entity<TimeInterval>().Property(c => c.OverTime).HasDefaultValue(60).IsRequired();

            builder.Entity<Linkpool>().ToTable($"App{nameof(this.LinkPools)}");
            builder.Entity<Linkpool>().Property(c => c.PoolName).HasMaxLength(50).HasDefaultValue("");
            builder.Entity<Linkpool>().Property(c => c.LinkPath).HasMaxLength(100).HasDefaultValue("");

            builder.Entity<DeviceLinkpool>().ToTable($"App{nameof(this.DeviceLinkPools)}");
            //builder.Entity<DeviceLinkpool>().Property(c => c.DeviceLinkpoolId).ValueGeneratedOnAdd();
            builder.Entity<DeviceLinkpool>().HasKey(t => new {t.DeviceId, t.LinkpoolId});
            builder.Entity<DeviceLinkpool>().HasOne(ho => ho.Device).WithMany(wm => wm.DeviceLinkpools)
                .HasForeignKey(hf => hf.DeviceId).OnDelete(DeleteBehavior.Cascade);
            builder.Entity<DeviceLinkpool>().HasOne(ho => ho.Linkpool).WithMany(wm => wm.DeviceLinkpools)
                .HasForeignKey(hf => hf.LinkpoolId).OnDelete(DeleteBehavior.Cascade);


        }




        public override int SaveChanges()
        {
            UpdateAuditEntities();
            return base.SaveChanges();
        }


        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            UpdateAuditEntities();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }


        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            UpdateAuditEntities();
            return base.SaveChangesAsync(cancellationToken);
        }


        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
        {
            UpdateAuditEntities();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }


        private void UpdateAuditEntities()
        {
            var modifiedEntries = ChangeTracker.Entries()
                .Where(x => x.Entity is IAuditableEntity && (x.State == EntityState.Added || x.State == EntityState.Modified));


            foreach (var entry in modifiedEntries)
            {
                var entity = (IAuditableEntity)entry.Entity;
                DateTime now = DateTime.UtcNow;

                if (entry.State == EntityState.Added)
                {
                    entity.CreatedDate = now;
                    entity.CreatedBy = CurrentUserId;
                }
                else
                {
                    base.Entry(entity).Property(x => x.CreatedBy).IsModified = false;
                    base.Entry(entity).Property(x => x.CreatedDate).IsModified = false;
                }

                entity.UpdatedDate = now;
                entity.UpdatedBy = CurrentUserId;
            }
        }
    }
}
