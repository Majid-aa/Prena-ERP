using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Prena.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddAgentLevelAndUpdateEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AgentLevels",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LevelKey = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LevelNameFa = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    LevelNumber = table.Column<int>(type: "int", nullable: false),
                    AutoPermissions = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaxAssignedCustomers = table.Column<int>(type: "int", nullable: true),
                    CanWaivePayment = table.Column<bool>(type: "bit", nullable: false),
                    MaxWaiveAmount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false, defaultValue: 0m),
                    CanCreateRoles = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AgentLevels", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AgentLevels_LevelKey",
                table: "AgentLevels",
                column: "LevelKey",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AgentLevels");
        }
    }
}
