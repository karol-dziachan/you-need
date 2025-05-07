using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace KARacter.YouNeed.Api.Migrations
{
    /// <inheritdoc />
    public partial class SchedulesExtend : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CompanyUserId",
                table: "CompanyWorkSchedules",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "CompanyWorkSchedules",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_CompanyWorkSchedules_CompanyUserId",
                table: "CompanyWorkSchedules",
                column: "CompanyUserId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyWorkSchedules_UserId",
                table: "CompanyWorkSchedules",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyWorkSchedules_CompanyUsers_CompanyUserId",
                table: "CompanyWorkSchedules",
                column: "CompanyUserId",
                principalTable: "CompanyUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyWorkSchedules_CompanyUsers_UserId",
                table: "CompanyWorkSchedules",
                column: "UserId",
                principalTable: "CompanyUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CompanyWorkSchedules_CompanyUsers_CompanyUserId",
                table: "CompanyWorkSchedules");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyWorkSchedules_CompanyUsers_UserId",
                table: "CompanyWorkSchedules");

            migrationBuilder.DropIndex(
                name: "IX_CompanyWorkSchedules_CompanyUserId",
                table: "CompanyWorkSchedules");

            migrationBuilder.DropIndex(
                name: "IX_CompanyWorkSchedules_UserId",
                table: "CompanyWorkSchedules");

            migrationBuilder.DropColumn(
                name: "CompanyUserId",
                table: "CompanyWorkSchedules");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "CompanyWorkSchedules");
        }
    }
}
