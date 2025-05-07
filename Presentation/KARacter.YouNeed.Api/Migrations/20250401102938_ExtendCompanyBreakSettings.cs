using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KARacter.YouNeed.Api.Migrations
{
    /// <inheritdoc />
    public partial class ExtendCompanyBreakSettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "CompanyBreakSettings",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_CompanyBreakSettings_UserId",
                table: "CompanyBreakSettings",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyBreakSettings_Users_UserId",
                table: "CompanyBreakSettings",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CompanyBreakSettings_Users_UserId",
                table: "CompanyBreakSettings");

            migrationBuilder.DropIndex(
                name: "IX_CompanyBreakSettings_UserId",
                table: "CompanyBreakSettings");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "CompanyBreakSettings");
        }
    }
}
