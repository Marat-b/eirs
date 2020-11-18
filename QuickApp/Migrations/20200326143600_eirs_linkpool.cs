using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace QuickApp.Migrations
{
    public partial class eirs_linkpool : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppLinkPools",
                columns: table => new
                {
                    LinkpoolId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PoolName = table.Column<string>(maxLength: 50, nullable: true, defaultValue: ""),
                    LinkPath = table.Column<string>(maxLength: 100, nullable: true, defaultValue: "")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppLinkPools", x => x.LinkpoolId);
                });

            migrationBuilder.CreateTable(
                name: "AppDeviceLinkPools",
                columns: table => new
                {
                    DeviceId = table.Column<int>(nullable: false),
                    LinkpoolId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppDeviceLinkPools", x => new { x.DeviceId, x.LinkpoolId });
                    table.ForeignKey(
                        name: "FK_AppDeviceLinkPools_AppDevices_DeviceId",
                        column: x => x.DeviceId,
                        principalTable: "AppDevices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppDeviceLinkPools_AppLinkPools_LinkpoolId",
                        column: x => x.LinkpoolId,
                        principalTable: "AppLinkPools",
                        principalColumn: "LinkpoolId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppDeviceLinkPools_LinkpoolId",
                table: "AppDeviceLinkPools",
                column: "LinkpoolId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppDeviceLinkPools");

            migrationBuilder.DropTable(
                name: "AppLinkPools");
        }
    }
}
