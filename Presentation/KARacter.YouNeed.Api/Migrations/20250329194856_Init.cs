using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KARacter.YouNeed.Api.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Company",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    NIP = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    REGON = table.Column<string>(type: "nvarchar(14)", maxLength: 14, nullable: true),
                    Address = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    City = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PostalCode = table.Column<string>(type: "nvarchar(6)", maxLength: 6, nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Website = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDateTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Company", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PaymentMethod",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    IsDefault = table.Column<bool>(type: "bit", nullable: false),
                    IconUrl = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    IntegrationConfig = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    CreatedDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDateTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentMethod", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    IsEmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    LastLoginDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    RefreshToken = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    RefreshTokenExpiryTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDateTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserRole",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    CreatedDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDateTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRole", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CompanyBreakSettings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CompanyId1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    MinimumBreakBetweenOrdersInMinutes = table.Column<int>(type: "int", nullable: false),
                    MaximumOrdersPerDay = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    AllowWeekendOrders = table.Column<bool>(type: "bit", nullable: false),
                    AllowHolidayOrders = table.Column<bool>(type: "bit", nullable: false),
                    ExcludedDates = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    SpecialBreakRules = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    CreatedDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDateTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyBreakSettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompanyBreakSettings_Company_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CompanyBreakSettings_Company_CompanyId1",
                        column: x => x.CompanyId1,
                        principalTable: "Company",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CompanyWorkArea",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    City = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PostalCode = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    District = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    RadiusInKm = table.Column<decimal>(type: "decimal(8,2)", precision: 8, scale: 2, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    AdditionalInfo = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    CompanyId1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDateTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyWorkArea", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompanyWorkArea_Company_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CompanyWorkArea_Company_CompanyId1",
                        column: x => x.CompanyId1,
                        principalTable: "Company",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CompanyWorkSchedule",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DayOfWeek = table.Column<int>(type: "int", nullable: false),
                    StartTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    EndTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    IsBreakTime = table.Column<bool>(type: "bit", nullable: false),
                    BreakStartTime = table.Column<TimeSpan>(type: "time", nullable: true),
                    BreakEndTime = table.Column<TimeSpan>(type: "time", nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CompanyId1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDateTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyWorkSchedule", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompanyWorkSchedule_Company_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CompanyWorkSchedule_Company_CompanyId1",
                        column: x => x.CompanyId1,
                        principalTable: "Company",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CompanyPaymentMethod",
                columns: table => new
                {
                    CompaniesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PaymentMethodsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyPaymentMethod", x => new { x.CompaniesId, x.PaymentMethodsId });
                    table.ForeignKey(
                        name: "FK_CompanyPaymentMethod_Company_CompaniesId",
                        column: x => x.CompaniesId,
                        principalTable: "Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CompanyPaymentMethod_PaymentMethod_PaymentMethodsId",
                        column: x => x.PaymentMethodsId,
                        principalTable: "PaymentMethod",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Payment",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PaymentMethodId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Currency = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    TransactionId = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    PaymentReference = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    ErrorMessage = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    PaymentDetails = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    PaymentDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ExpirationDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CustomerEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    CustomerName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    CustomerPhone = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    CustomerAddress = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    CustomerCity = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    CustomerPostalCode = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    CustomerCountry = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    CreatedDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDateTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Payment_PaymentMethod_PaymentMethodId",
                        column: x => x.PaymentMethodId,
                        principalTable: "PaymentMethod",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CompanyUser",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    UserRoleId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserRoleId1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Position = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Department = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    CreatedDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDateTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyUser", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompanyUser_Company_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CompanyUser_UserRole_UserRoleId",
                        column: x => x.UserRoleId,
                        principalTable: "UserRole",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CompanyUser_UserRole_UserRoleId1",
                        column: x => x.UserRoleId1,
                        principalTable: "UserRole",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CompanyUser_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CompanyUser_User_UserId1",
                        column: x => x.UserId1,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CompanyPayment",
                columns: table => new
                {
                    CompaniesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PaymentsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyPayment", x => new { x.CompaniesId, x.PaymentsId });
                    table.ForeignKey(
                        name: "FK_CompanyPayment_Company_CompaniesId",
                        column: x => x.CompaniesId,
                        principalTable: "Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CompanyPayment_Payment_PaymentsId",
                        column: x => x.PaymentsId,
                        principalTable: "Payment",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CompanyBreakSettings_CompanyId",
                table: "CompanyBreakSettings",
                column: "CompanyId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CompanyBreakSettings_CompanyId1",
                table: "CompanyBreakSettings",
                column: "CompanyId1");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyPayment_PaymentsId",
                table: "CompanyPayment",
                column: "PaymentsId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyPaymentMethod_PaymentMethodsId",
                table: "CompanyPaymentMethod",
                column: "PaymentMethodsId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyUser_CompanyId",
                table: "CompanyUser",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyUser_UserId",
                table: "CompanyUser",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CompanyUser_UserId1",
                table: "CompanyUser",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyUser_UserRoleId",
                table: "CompanyUser",
                column: "UserRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyUser_UserRoleId1",
                table: "CompanyUser",
                column: "UserRoleId1");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyWorkArea_CompanyId",
                table: "CompanyWorkArea",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyWorkArea_CompanyId1",
                table: "CompanyWorkArea",
                column: "CompanyId1");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyWorkSchedule_CompanyId",
                table: "CompanyWorkSchedule",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyWorkSchedule_CompanyId1",
                table: "CompanyWorkSchedule",
                column: "CompanyId1");

            migrationBuilder.CreateIndex(
                name: "IX_Payment_PaymentMethodId",
                table: "Payment",
                column: "PaymentMethodId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CompanyBreakSettings");

            migrationBuilder.DropTable(
                name: "CompanyPayment");

            migrationBuilder.DropTable(
                name: "CompanyPaymentMethod");

            migrationBuilder.DropTable(
                name: "CompanyUser");

            migrationBuilder.DropTable(
                name: "CompanyWorkArea");

            migrationBuilder.DropTable(
                name: "CompanyWorkSchedule");

            migrationBuilder.DropTable(
                name: "Payment");

            migrationBuilder.DropTable(
                name: "UserRole");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Company");

            migrationBuilder.DropTable(
                name: "PaymentMethod");
        }
    }
}
