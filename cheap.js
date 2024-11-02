
const originalFetch = window.fetch;

window.fetch = async function(url, options) {
    if (url.includes("payments.mspapis.com/offers//v2/payment-offer/")) {
        return new Response(
            JSON.stringify({
                "Offers": [
                    {
                        "AutoRenewableSubscription": false,
                        "Benefits": [
                            "generic_sale"
                        ],
                        "Cost": {
                            "Amount": 599,
                            "Formatted": "5,99 €",
                            "Currency": "EUR"
                        },
                        "CountryGeoLocated": "FR",
                        "Content": {
                            "BundledItems": [
                                {
                                    "Amount": 2500,
                                    "Description": "StarCoins",
                                    "ItemReference": "SoftCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 25,
                                    "Description": "Diamonds",
                                    "ItemReference": "HardCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 7,
                                    "Description": "Days of VIP access",
                                    "ItemReference": "DaysVip",
                                    "Variant": "3"
                                },
                                {
                                    "Amount": 500,
                                    "Description": "Bonus SoftCurrency",
                                    "ItemReference": "SoftCurrencyBonus",
                                    "Variant": "generic_sale"
                                },
                                {
                                    "Amount": 5,
                                    "Description": "Bonus HardCurrency",
                                    "ItemReference": "HardCurrencyBonus",
                                    "Variant": "generic_sale"
                                }
                            ],
                            "Id": "2010",
                            "Name": "VIP 1 semaine",
                            "RecurringPaymentAllowed": false,
                            "Type": "VipPackage",
                            "VipCurrencyBonusPercentage": null
                        },
                        "Description": "2500+500 StarCoins, 25+5 Diamonds, 7 Jours VIP",
                        "ExpirationTime": "2024-11-02T20:06:45.9992561Z",
                        "GameProductId": "2010",
                        "Id": "7304918FR-FR-W-MSP2-2010",
                        "PricingStrategyName": "generic_sale",
                        "PspProductIds": [],
                        "StandardCost": {
                            "Amount": 599,
                            "Formatted": "5,99 €",
                            "Currency": "EUR"
                        },
                        "VipRestricted": null
                    },
                    {
                        "AutoRenewableSubscription": false,
                        "Benefits": [
                            "generic_sale"
                        ],
                        "Cost": {
                            "Amount": 1299,
                            "Formatted": "12,99 €",
                            "Currency": "EUR"
                        },
                        "CountryGeoLocated": "FR",
                        "Content": {
                            "BundledItems": [
                                {
                                    "Amount": 10000,
                                    "Description": "StarCoins",
                                    "ItemReference": "SoftCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 100,
                                    "Description": "Diamonds",
                                    "ItemReference": "HardCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 30,
                                    "Description": "Days of VIP access",
                                    "ItemReference": "DaysVip",
                                    "Variant": "3"
                                },
                                {
                                    "Amount": 2000,
                                    "Description": "Bonus SoftCurrency",
                                    "ItemReference": "SoftCurrencyBonus",
                                    "Variant": "generic_sale"
                                },
                                {
                                    "Amount": 20,
                                    "Description": "Bonus HardCurrency",
                                    "ItemReference": "HardCurrencyBonus",
                                    "Variant": "generic_sale"
                                }
                            ],
                            "Id": "6010",
                            "Name": "VIP 1 mois",
                            "RecurringPaymentAllowed": false,
                            "Type": "VipPackage",
                            "VipCurrencyBonusPercentage": null
                        },
                        "Description": "10000+2000 StarCoins, 100+20 Diamonds, 30 Jours VIP",
                        "ExpirationTime": "2024-11-02T20:06:45.9992561Z",
                        "GameProductId": "6010",
                        "Id": "7304918FR-FR-W-MSP2-6010",
                        "PricingStrategyName": "generic_sale",
                        "PspProductIds": [],
                        "StandardCost": {
                            "Amount": 1299,
                            "Formatted": "12,99 €",
                            "Currency": "EUR"
                        },
                        "VipRestricted": null
                    },
                    {
                        "AutoRenewableSubscription": false,
                        "Benefits": [
                            "generic_sale"
                        ],
                        "Cost": {
                            "Amount": 3799,
                            "Formatted": "37,99 €",
                            "Currency": "EUR"
                        },
                        "CountryGeoLocated": "FR",
                        "Content": {
                            "BundledItems": [
                                {
                                    "Amount": 30000,
                                    "Description": "StarCoins",
                                    "ItemReference": "SoftCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 300,
                                    "Description": "Diamonds",
                                    "ItemReference": "HardCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 90,
                                    "Description": "Days of VIP access",
                                    "ItemReference": "DaysVip",
                                    "Variant": "3"
                                },
                                {
                                    "Amount": 6000,
                                    "Description": "Bonus SoftCurrency",
                                    "ItemReference": "SoftCurrencyBonus",
                                    "Variant": "generic_sale"
                                },
                                {
                                    "Amount": 60,
                                    "Description": "Bonus HardCurrency",
                                    "ItemReference": "HardCurrencyBonus",
                                    "Variant": "generic_sale"
                                }
                            ],
                            "Id": "14010",
                            "Name": "VIP 3 mois",
                            "RecurringPaymentAllowed": false,
                            "Type": "VipPackage",
                            "VipCurrencyBonusPercentage": null
                        },
                        "Description": "30000+6000 StarCoins, 300+60 Diamonds, 90 Jours VIP",
                        "ExpirationTime": "2024-11-02T20:06:45.9992561Z",
                        "GameProductId": "14010",
                        "Id": "7304918FR-FR-W-MSP2-14010",
                        "PricingStrategyName": "generic_sale",
                        "PspProductIds": [],
                        "StandardCost": {
                            "Amount": 3799,
                            "Formatted": "37,99 €",
                            "Currency": "EUR"
                        },
                        "VipRestricted": null
                    },
                    {
                        "AutoRenewableSubscription": false,
                        "Benefits": [
                            "generic_sale"
                        ],
                        "Cost": {
                            "Amount": 6999,
                            "Formatted": "55,00 €",
                            "Currency": "EUR"
                        },
                        "CountryGeoLocated": "FR",
                        "Content": {
                            "BundledItems": [
                                {
                                    "Amount": 70000,
                                    "Description": "StarCoins",
                                    "ItemReference": "SoftCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 520,
                                    "Description": "Diamonds",
                                    "ItemReference": "HardCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 365,
                                    "Description": "Days of VIP access",
                                    "ItemReference": "DaysVip",
                                    "Variant": "3"
                                }
                            ],
                            "Id": "42040",
                            "Name": "VIP 1 an",
                            "RecurringPaymentAllowed": false,
                            "Type": "VipPackage",
                            "VipCurrencyBonusPercentage": null
                        },
                        "Description": "70000 StarCoins, 520 Diamonds, 365 Jours VIP",
                        "ExpirationTime": "2024-11-02T20:06:45.9992561Z",
                        "GameProductId": "42040",
                        "Id": "7304918FR-FR-W-MSP2-42010",
                        "PricingStrategyName": "generic_sale",
                        "PspProductIds": [],
                        "StandardCost": {
                            "Amount": 6999,
                            "Formatted": "55,00 €",
                            "Currency": "EUR"
                        },
                        "VipRestricted": null
                    },
                    {
                        "AutoRenewableSubscription": false,
                        "Benefits": [
                            "generic_sale"
                        ],
                        "Cost": {
                            "Amount": 249,
                            "Formatted": "2,49 €",
                            "Currency": "EUR"
                        },
                        "CountryGeoLocated": "FR",
                        "Content": {
                            "BundledItems": [
                                {
                                    "Amount": 1000,
                                    "Description": "StarCoins",
                                    "ItemReference": "SoftCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 10,
                                    "Description": "Diamonds",
                                    "ItemReference": "HardCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 250,
                                    "Description": "Bonus SoftCurrency",
                                    "ItemReference": "SoftCurrencyBonus",
                                    "Variant": "generic_sale"
                                },
                                {
                                    "Amount": 3,
                                    "Description": "Bonus HardCurrency",
                                    "ItemReference": "HardCurrencyBonus",
                                    "Variant": "generic_sale"
                                }
                            ],
                            "Id": "2002",
                            "Name": "Top-Up Bronze",
                            "RecurringPaymentAllowed": false,
                            "Type": "TopUp",
                            "VipCurrencyBonusPercentage": 50
                        },
                        "Description": "1000+250 StarCoins, 10+3 Diamonds",
                        "ExpirationTime": "2024-11-02T20:06:45.9992561Z",
                        "GameProductId": "2002",
                        "Id": "7304918FR-FR-W-MSP2-2002",
                        "PricingStrategyName": "generic_sale",
                        "PspProductIds": [],
                        "StandardCost": {
                            "Amount": 249,
                            "Formatted": "2,49 €",
                            "Currency": "EUR"
                        },
                        "VipRestricted": false
                    },
                    {
                        "AutoRenewableSubscription": false,
                        "Benefits": [
                            "generic_sale"
                        ],
                        "Cost": {
                            "Amount": 799,
                            "Formatted": "7,99 €",
                            "Currency": "EUR"
                        },
                        "CountryGeoLocated": "FR",
                        "Content": {
                            "BundledItems": [
                                {
                                    "Amount": 5000,
                                    "Description": "StarCoins",
                                    "ItemReference": "SoftCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 50,
                                    "Description": "Diamonds",
                                    "ItemReference": "HardCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 1250,
                                    "Description": "Bonus SoftCurrency",
                                    "ItemReference": "SoftCurrencyBonus",
                                    "Variant": "generic_sale"
                                },
                                {
                                    "Amount": 13,
                                    "Description": "Bonus HardCurrency",
                                    "ItemReference": "HardCurrencyBonus",
                                    "Variant": "generic_sale"
                                }
                            ],
                            "Id": "6002",
                            "Name": "Top-Up Argent",
                            "RecurringPaymentAllowed": false,
                            "Type": "TopUp",
                            "VipCurrencyBonusPercentage": 50
                        },
                        "Description": "5000+1250 StarCoins, 50+13 Diamonds",
                        "ExpirationTime": "2024-11-02T20:06:45.9992561Z",
                        "GameProductId": "6002",
                        "Id": "7304918FR-FR-W-MSP2-6002",
                        "PricingStrategyName": "generic_sale",
                        "PspProductIds": [],
                        "StandardCost": {
                            "Amount": 799,
                            "Formatted": "7,99 €",
                            "Currency": "EUR"
                        },
                        "VipRestricted": false
                    },
                    {
                        "AutoRenewableSubscription": false,
                        "Benefits": [
                            "generic_sale"
                        ],
                        "Cost": {
                            "Amount": 1299,
                            "Formatted": "12,99 €",
                            "Currency": "EUR"
                        },
                        "CountryGeoLocated": "FR",
                        "Content": {
                            "BundledItems": [
                                {
                                    "Amount": 10000,
                                    "Description": "StarCoins",
                                    "ItemReference": "SoftCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 100,
                                    "Description": "Diamonds",
                                    "ItemReference": "HardCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 2500,
                                    "Description": "Bonus SoftCurrency",
                                    "ItemReference": "SoftCurrencyBonus",
                                    "Variant": "generic_sale"
                                },
                                {
                                    "Amount": 25,
                                    "Description": "Bonus HardCurrency",
                                    "ItemReference": "HardCurrencyBonus",
                                    "Variant": "generic_sale"
                                }
                            ],
                            "Id": "14002",
                            "Name": "Top-Up Or",
                            "RecurringPaymentAllowed": false,
                            "Type": "TopUp",
                            "VipCurrencyBonusPercentage": 50
                        },
                        "Description": "10000+2500 StarCoins, 100+25 Diamonds",
                        "ExpirationTime": "2024-11-02T20:06:45.9992561Z",
                        "GameProductId": "14002",
                        "Id": "7304918FR-FR-W-MSP2-14002",
                        "PricingStrategyName": "generic_sale",
                        "PspProductIds": [],
                        "StandardCost": {
                            "Amount": 1299,
                            "Formatted": "12,99 €",
                            "Currency": "EUR"
                        },
                        "VipRestricted": false
                    },
                    {
                        "AutoRenewableSubscription": false,
                        "Benefits": [
                            "generic_sale"
                        ],
                        "Cost": {
                            "Amount": 2599,
                            "Formatted": "25,99 €",
                            "Currency": "EUR"
                        },
                        "CountryGeoLocated": "FR",
                        "Content": {
                            "BundledItems": [
                                {
                                    "Amount": 22000,
                                    "Description": "StarCoins",
                                    "ItemReference": "SoftCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 220,
                                    "Description": "Diamonds",
                                    "ItemReference": "HardCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 5500,
                                    "Description": "Bonus SoftCurrency",
                                    "ItemReference": "SoftCurrencyBonus",
                                    "Variant": "generic_sale"
                                },
                                {
                                    "Amount": 55,
                                    "Description": "Bonus HardCurrency",
                                    "ItemReference": "HardCurrencyBonus",
                                    "Variant": "generic_sale"
                                }
                            ],
                            "Id": "20002",
                            "Name": "Top-Up Platine",
                            "RecurringPaymentAllowed": false,
                            "Type": "TopUp",
                            "VipCurrencyBonusPercentage": 50
                        },
                        "Description": "22000+5500 StarCoins, 220+55 Diamonds",
                        "ExpirationTime": "2024-11-02T20:06:45.9992561Z",
                        "GameProductId": "20002",
                        "Id": "7304918FR-FR-W-MSP2-20002",
                        "PricingStrategyName": "generic_sale",
                        "PspProductIds": [],
                        "StandardCost": {
                            "Amount": 2599,
                            "Formatted": "25,99 €",
                            "Currency": "EUR"
                        },
                        "VipRestricted": false
                    },
                    {
                        "AutoRenewableSubscription": false,
                        "Benefits": [
                            "generic_sale"
                        ],
                        "Cost": {
                            "Amount": 4199,
                            "Formatted": "41,99 €",
                            "Currency": "EUR"
                        },
                        "CountryGeoLocated": "FR",
                        "Content": {
                            "BundledItems": [
                                {
                                    "Amount": 100000,
                                    "Description": "StarCoins",
                                    "ItemReference": "SoftCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 1000,
                                    "Description": "Diamonds",
                                    "ItemReference": "HardCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Elegant Sparkles",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_girltop_tk\",\"Snapshot\":\"msp2_wingcamp_2024_girltop_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_GIRL\"],\"NoCount\":false}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Relaxed Luxury",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_boytop_tk\",\"Snapshot\":\"msp2_wingcamp_2024_boytop_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_BOY\"],\"NoCount\":true}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "High-Class",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_girlhair_tk\",\"Snapshot\":\"msp2_wingcamp_2024_girlhair_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_GIRL\"],\"NoCount\":false}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Classic Elegance",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_boyhair_tk\",\"Snapshot\":\"msp2_wingcamp_2024_boyhair_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_BOY\"],\"NoCount\":true}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Grand Flowing",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_girlbot_tk\",\"Snapshot\":\"msp2_wingcamp_2024_girlbot_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_GIRL\"],\"NoCount\":false}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Handsome Flow",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_boybot_tk\",\"Snapshot\":\"msp2_wingcamp_2024_boybot_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_BOY\"],\"NoCount\":true}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Broken Wings",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_wingsg_tk\",\"Snapshot\":\"msp2_wingcamp_2024_wingsg_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_GIRL\"],\"NoCount\":false}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Broken Wings",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_wingsb_tk\",\"Snapshot\":\"msp2_wingcamp_2024_wingsb_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_BOY\"],\"NoCount\":true}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "A Wink of Elegance",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_eyesg_tk\",\"Snapshot\":\"msp2_wingcamp_2024_eyesg_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_GIRL\"],\"NoCount\":false}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "A Wink of Elegance",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_eyesb_tk\",\"Snapshot\":\"msp2_wingcamp_2024_eyesb_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_BOY\"],\"NoCount\":true}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Vorki",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_pet_wingcamp_2024_dragon2_dg_prop\",\"Snapshot\":\"msp2_pet_wingcamp_2024_dragon2_dg_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_PET\"],\"NoCount\":false}"
                                },
                                {
                                    "Amount": 25000,
                                    "Description": "Bonus SoftCurrency",
                                    "ItemReference": "SoftCurrencyBonus",
                                    "Variant": "generic_sale"
                                },
                                {
                                    "Amount": 250,
                                    "Description": "Bonus HardCurrency",
                                    "ItemReference": "HardCurrencyBonus",
                                    "Variant": "generic_sale"
                                }
                            ],
                            "Id": "42002",
                            "Name": "Top-Up Diamant",
                            "RecurringPaymentAllowed": false,
                            "Type": "TopUp",
                            "VipCurrencyBonusPercentage": null
                        },
                        "Description": "100000+25000 StarCoins, 1000+250 Diamonds",
                        "ExpirationTime": "2024-11-02T20:06:45.9992561Z",
                        "GameProductId": "42002",
                        "Id": "7304918FR-FR-W-MSP2-42002",
                        "PricingStrategyName": "generic_sale",
                        "PspProductIds": [],
                        "StandardCost": {
                            "Amount": 4199,
                            "Formatted": "41,99 €",
                            "Currency": "EUR"
                        },
                        "VipRestricted": true
                    },
                    {
                        "AutoRenewableSubscription": false,
                        "Benefits": [],
                        "Cost": {
                            "Amount": 299,
                            "Formatted": "2,99 €",
                            "Currency": "EUR"
                        },
                        "CountryGeoLocated": "FR",
                        "Content": {
                            "BundledItems": [
                                {
                                    "Amount": 3000,
                                    "Description": "StarCoins",
                                    "ItemReference": "SoftCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 30,
                                    "Description": "Diamonds",
                                    "ItemReference": "HardCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 8,
                                    "Description": "Days of VIP access",
                                    "ItemReference": "DaysVip",
                                    "Variant": "3"
                                }
                            ],
                            "Id": "1002",
                            "Name": "Offre de bienvenue",
                            "RecurringPaymentAllowed": false,
                            "Type": "Trial",
                            "VipCurrencyBonusPercentage": null
                        },
                        "Description": "3000 StarCoins, 30 Diamonds, 8 Jours VIP",
                        "ExpirationTime": "2024-11-02T20:06:45.9992561Z",
                        "GameProductId": "100000",
                        "Id": "7304918FR-FR-W-MSP2-100000",
                        "PricingStrategyName": null,
                        "PspProductIds": [],
                        "StandardCost": {
                            "Amount": 299,
                            "Formatted": "2,99 €",
                            "Currency": "EUR"
                        },
                        "VipRestricted": null
                    },
                    {
                        "AutoRenewableSubscription": true,
                        "Benefits": [],
                        "Cost": {
                            "Amount": 1299,
                            "Formatted": "12,99 €",
                            "Currency": "EUR"
                        },
                        "CountryGeoLocated": "FR",
                        "Content": {
                            "BundledItems": [
                                {
                                    "Amount": 10000,
                                    "Description": "StarCoins",
                                    "ItemReference": "SoftCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 100,
                                    "Description": "Diamonds",
                                    "ItemReference": "HardCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 30,
                                    "Description": "Days of VIP access",
                                    "ItemReference": "DaysVip",
                                    "Variant": "3"
                                }
                            ],
                            "Id": "6050",
                            "Name": "Abonnement VIP 1 mois",
                            "RecurringPaymentAllowed": false,
                            "Type": "VipPackage",
                            "VipCurrencyBonusPercentage": null
                        },
                        "Description": "10000 StarCoins, 100 Diamonds, 30 Jours VIP",
                        "ExpirationTime": "2024-11-02T20:06:45.9992561Z",
                        "GameProductId": "6050",
                        "Id": "7304918FR-FR-W-MSP2-6050",
                        "PricingStrategyName": null,
                        "PspProductIds": [],
                        "StandardCost": {
                            "Amount": 1299,
                            "Formatted": "12,99 €",
                            "Currency": "EUR"
                        },
                        "VipRestricted": false
                    },
                    {
                        "AutoRenewableSubscription": true,
                        "Benefits": [],
                        "Cost": {
                            "Amount": 3799,
                            "Formatted": "37,99 €",
                            "Currency": "EUR"
                        },
                        "CountryGeoLocated": "FR",
                        "Content": {
                            "BundledItems": [
                                {
                                    "Amount": 30000,
                                    "Description": "StarCoins",
                                    "ItemReference": "SoftCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 300,
                                    "Description": "Diamonds",
                                    "ItemReference": "HardCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 90,
                                    "Description": "Days of VIP access",
                                    "ItemReference": "DaysVip",
                                    "Variant": "3"
                                }
                            ],
                            "Id": "14050",
                            "Name": "Abonnement VIP 3 mois",
                            "RecurringPaymentAllowed": false,
                            "Type": "VipPackage",
                            "VipCurrencyBonusPercentage": null
                        },
                        "Description": "30000 StarCoins, 300 Diamonds, 90 Jours VIP",
                        "ExpirationTime": "2024-11-02T20:06:45.9992561Z",
                        "GameProductId": "14050",
                        "Id": "7304918FR-FR-W-MSP2-14050",
                        "PricingStrategyName": null,
                        "PspProductIds": [],
                        "StandardCost": {
                            "Amount": 3799,
                            "Formatted": "37,99 €",
                            "Currency": "EUR"
                        },
                        "VipRestricted": false
                    },
                    {
                        "AutoRenewableSubscription": null,
                        "Benefits": [],
                        "Cost": {
                            "Amount": 7499,
                            "Formatted": "74,99 €",
                            "Currency": "EUR"
                        },
                        "CountryGeoLocated": "FR",
                        "Content": {
                            "BundledItems": [
                                {
                                    "Amount": 150000,
                                    "Description": "StarCoins",
                                    "ItemReference": "SoftCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 1500,
                                    "Description": "Diamonds",
                                    "ItemReference": "HardCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 365,
                                    "Description": "Days of VIP access",
                                    "ItemReference": "DaysVip",
                                    "Variant": "3"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Elegant Sparkles",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_girltop_tk\",\"Snapshot\":\"msp2_wingcamp_2024_girltop_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_GIRL\"],\"NoCount\":false}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Relaxed Luxury",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_boytop_tk\",\"Snapshot\":\"msp2_wingcamp_2024_boytop_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_BOY\"],\"NoCount\":true}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "High-Class",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_girlhair_tk\",\"Snapshot\":\"msp2_wingcamp_2024_girlhair_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_GIRL\"],\"NoCount\":false}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Classic Elegance",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_boyhair_tk\",\"Snapshot\":\"msp2_wingcamp_2024_boyhair_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_BOY\"],\"NoCount\":true}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Grand Flowing",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_girlbot_tk\",\"Snapshot\":\"msp2_wingcamp_2024_girlbot_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_GIRL\"],\"NoCount\":false}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Handsome Flow",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_boybot_tk\",\"Snapshot\":\"msp2_wingcamp_2024_boybot_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_BOY\"],\"NoCount\":true}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Broken Wings",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_wingsg_tk\",\"Snapshot\":\"msp2_wingcamp_2024_wingsg_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_GIRL\"],\"NoCount\":false}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Broken Wings",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_wingsb_tk\",\"Snapshot\":\"msp2_wingcamp_2024_wingsb_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_BOY\"],\"NoCount\":true}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "A Wink of Elegance",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_eyesg_tk\",\"Snapshot\":\"msp2_wingcamp_2024_eyesg_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_GIRL\"],\"NoCount\":false}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "A Wink of Elegance",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_eyesb_tk\",\"Snapshot\":\"msp2_wingcamp_2024_eyesb_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_BOY\"],\"NoCount\":true}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Vorki",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_pet_wingcamp_2024_dragon2_dg_prop\",\"Snapshot\":\"msp2_pet_wingcamp_2024_dragon2_dg_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_PET\"],\"NoCount\":false}"
                                }
                            ],
                            "Id": "42050",
                            "Name": "Abonnement VIP 1 an",
                            "RecurringPaymentAllowed": false,
                            "Type": "VipPackage",
                            "VipCurrencyBonusPercentage": null
                        },
                        "Description": "150000 StarCoins, 1500 Diamonds, 365 Jours VIP",
                        "ExpirationTime": "2024-11-02T20:06:45.9992561Z",
                        "GameProductId": "42050",
                        "Id": "7304918FR-FR-W-MSP2-42050",
                        "PricingStrategyName": null,
                        "PspProductIds": [],
                        "StandardCost": {
                            "Amount": 7499,
                            "Formatted": "74,99 €",
                            "Currency": "EUR"
                        },
                        "VipRestricted": null
                    },
                    {
                        "AutoRenewableSubscription": null,
                        "Benefits": [],
                        "Cost": {
                            "Amount": 599,
                            "Formatted": "5,99 €",
                            "Currency": "EUR"
                        },
                        "CountryGeoLocated": "FR",
                        "Content": {
                            "BundledItems": [
                                {
                                    "Amount": 2300,
                                    "Description": "StarCoins",
                                    "ItemReference": "SoftCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 15,
                                    "Description": "Diamonds",
                                    "ItemReference": "HardCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 7,
                                    "Description": "Days of VIP access",
                                    "ItemReference": "DaysVip",
                                    "Variant": "2"
                                }
                            ],
                            "Id": "2030",
                            "Name": "Elite VIP 1 semaine",
                            "RecurringPaymentAllowed": false,
                            "Type": "VipPackage",
                            "VipCurrencyBonusPercentage": null
                        },
                        "Description": "2300 StarCoins, 15 Diamonds, 7 Jours VIP",
                        "ExpirationTime": "2024-11-02T20:06:45.9992561Z",
                        "GameProductId": "2030",
                        "Id": "7304918FR-FR-W-MSP2-2030",
                        "PricingStrategyName": null,
                        "PspProductIds": [],
                        "StandardCost": {
                            "Amount": 599,
                            "Formatted": "5,99 €",
                            "Currency": "EUR"
                        },
                        "VipRestricted": null
                    },
                    {
                        "AutoRenewableSubscription": null,
                        "Benefits": [],
                        "Cost": {
                            "Amount": 5500,
                            "Formatted": "55,00 €",
                            "Currency": "EUR"
                        },
                        "CountryGeoLocated": "FR",
                        "Content": {
                            "BundledItems": [
                                {
                                    "Amount": 70000,
                                    "Description": "StarCoins",
                                    "ItemReference": "SoftCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 520,
                                    "Description": "Diamonds",
                                    "ItemReference": "HardCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 365,
                                    "Description": "Days of VIP access",
                                    "ItemReference": "DaysVip",
                                    "Variant": "0"
                                }
                            ],
                            "Id": "42010",
                            "Name": "Normal VIP 1 an",
                            "RecurringPaymentAllowed": false,
                            "Type": "VipPackage",
                            "VipCurrencyBonusPercentage": null
                        },
                        "Description": "70000 StarCoins, 520 Diamonds, 365 Jours VIP",
                        "ExpirationTime": "2024-11-02T20:06:46.0148605Z",
                        "GameProductId": "42010",
                        "Id": "7304918FR-FR-W-MSP2-42010",
                        "PricingStrategyName": null,
                        "PspProductIds": [],
                        "StandardCost": {
                            "Amount": 5500,
                            "Formatted": "55,00 €",
                            "Currency": "EUR"
                        },
                        "VipRestricted": null
                    },
                    {
                        "AutoRenewableSubscription": null,
                        "Benefits": [],
                        "Cost": {
                            "Amount": 450,
                            "Formatted": "4,50 €",
                            "Currency": "EUR"
                        },
                        "CountryGeoLocated": "FR",
                        "Content": {
                            "BundledItems": [
                                {
                                    "Amount": 3000,
                                    "Description": "StarCoins",
                                    "ItemReference": "SoftCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 20,
                                    "Description": "Diamonds",
                                    "ItemReference": "HardCurrency",
                                    "Variant": null
                                }
                            ],
                            "Id": "2001",
                            "Name": "Pack Bronze",
                            "RecurringPaymentAllowed": false,
                            "Type": "TopUp",
                            "VipCurrencyBonusPercentage": null
                        },
                        "Description": "3000 StarCoins, 20 Diamonds",
                        "ExpirationTime": "2024-11-02T20:06:46.0148605Z",
                        "GameProductId": "2001",
                        "Id": "7304918FR-FR-W-MSP2-2001",
                        "PricingStrategyName": null,
                        "PspProductIds": [],
                        "StandardCost": {
                            "Amount": 450,
                            "Formatted": "4,50 €",
                            "Currency": "EUR"
                        },
                        "VipRestricted": null
                    },
                    {
                        "AutoRenewableSubscription": null,
                        "Benefits": [],
                        "Cost": {
                            "Amount": 700,
                            "Formatted": "7,00 €",
                            "Currency": "EUR"
                        },
                        "CountryGeoLocated": "FR",
                        "Content": {
                            "BundledItems": [
                                {
                                    "Amount": 15000,
                                    "Description": "StarCoins",
                                    "ItemReference": "SoftCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 110,
                                    "Description": "Diamonds",
                                    "ItemReference": "HardCurrency",
                                    "Variant": null
                                }
                            ],
                            "Id": "6001",
                            "Name": "Pack Argent",
                            "RecurringPaymentAllowed": false,
                            "Type": "TopUp",
                            "VipCurrencyBonusPercentage": null
                        },
                        "Description": "15000 StarCoins, 110 Diamonds",
                        "ExpirationTime": "2024-11-02T20:06:46.0148605Z",
                        "GameProductId": "6001",
                        "Id": "7304918FR-FR-W-MSP2-6001",
                        "PricingStrategyName": null,
                        "PspProductIds": [],
                        "StandardCost": {
                            "Amount": 700,
                            "Formatted": "7,00 €",
                            "Currency": "EUR"
                        },
                        "VipRestricted": null
                    },
                    {
                        "AutoRenewableSubscription": null,
                        "Benefits": [],
                        "Cost": {
                            "Amount": 1299,
                            "Formatted": "12,99 €",
                            "Currency": "EUR"
                        },
                        "CountryGeoLocated": "FR",
                        "Content": {
                            "BundledItems": [
                                {
                                    "Amount": 11500,
                                    "Description": "StarCoins",
                                    "ItemReference": "SoftCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 80,
                                    "Description": "Diamonds",
                                    "ItemReference": "HardCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 30,
                                    "Description": "Days of VIP access",
                                    "ItemReference": "DaysVip",
                                    "Variant": "2"
                                }
                            ],
                            "Id": "6030",
                            "Name": "Elite VIP 1 mois",
                            "RecurringPaymentAllowed": false,
                            "Type": "VipPackage",
                            "VipCurrencyBonusPercentage": null
                        },
                        "Description": "11500 StarCoins, 80 Diamonds, 30 Jours VIP",
                        "ExpirationTime": "2024-11-02T20:06:46.0148605Z",
                        "GameProductId": "6030",
                        "Id": "7304918FR-FR-W-MSP2-6030",
                        "PricingStrategyName": null,
                        "PspProductIds": [],
                        "StandardCost": {
                            "Amount": 1299,
                            "Formatted": "12,99 €",
                            "Currency": "EUR"
                        },
                        "VipRestricted": null
                    },
                    {
                        "AutoRenewableSubscription": null,
                        "Benefits": [],
                        "Cost": {
                            "Amount": 1299,
                            "Formatted": "12,99 €",
                            "Currency": "EUR"
                        },
                        "CountryGeoLocated": "FR",
                        "Content": {
                            "BundledItems": [
                                {
                                    "Amount": 15000,
                                    "Description": "StarCoins",
                                    "ItemReference": "SoftCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 110,
                                    "Description": "Diamonds",
                                    "ItemReference": "HardCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 30,
                                    "Description": "Days of VIP access",
                                    "ItemReference": "DaysVip",
                                    "Variant": "3"
                                }
                            ],
                            "Id": "6040",
                            "Name": "Star VIP 1 mois",
                            "RecurringPaymentAllowed": false,
                            "Type": "VipPackage",
                            "VipCurrencyBonusPercentage": null
                        },
                        "Description": "15000 StarCoins, 110 Diamonds, 30 Jours VIP",
                        "ExpirationTime": "2024-11-02T20:06:46.0148605Z",
                        "GameProductId": "6040",
                        "Id": "7304918FR-FR-W-MSP2-6040",
                        "PricingStrategyName": null,
                        "PspProductIds": [],
                        "StandardCost": {
                            "Amount": 1299,
                            "Formatted": "12,99 €",
                            "Currency": "EUR"
                        },
                        "VipRestricted": null
                    },
                    {
                        "AutoRenewableSubscription": null,
                        "Benefits": [],
                        "Cost": {
                            "Amount": 2900,
                            "Formatted": "29,00 €",
                            "Currency": "EUR"
                        },
                        "CountryGeoLocated": "FR",
                        "Content": {
                            "BundledItems": [
                                {
                                    "Amount": 35000,
                                    "Description": "StarCoins",
                                    "ItemReference": "SoftCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 250,
                                    "Description": "Diamonds",
                                    "ItemReference": "HardCurrency",
                                    "Variant": null
                                }
                            ],
                            "Id": "14001",
                            "Name": "Pack Or",
                            "RecurringPaymentAllowed": false,
                            "Type": "TopUp",
                            "VipCurrencyBonusPercentage": null
                        },
                        "Description": "35000 StarCoins, 250 Diamonds",
                        "ExpirationTime": "2024-11-02T20:06:46.0148605Z",
                        "GameProductId": "14001",
                        "Id": "7304918FR-FR-W-MSP2-14001",
                        "PricingStrategyName": null,
                        "PspProductIds": [],
                        "StandardCost": {
                            "Amount": 2900,
                            "Formatted": "29,00 €",
                            "Currency": "EUR"
                        },
                        "VipRestricted": null
                    },
                    {
                        "AutoRenewableSubscription": null,
                        "Benefits": [],
                        "Cost": {
                            "Amount": 3799,
                            "Formatted": "37,99 €",
                            "Currency": "EUR"
                        },
                        "CountryGeoLocated": "FR",
                        "Content": {
                            "BundledItems": [
                                {
                                    "Amount": 27000,
                                    "Description": "StarCoins",
                                    "ItemReference": "SoftCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 195,
                                    "Description": "Diamonds",
                                    "ItemReference": "HardCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 90,
                                    "Description": "Days of VIP access",
                                    "ItemReference": "DaysVip",
                                    "Variant": "2"
                                }
                            ],
                            "Id": "14030",
                            "Name": "Elite VIP 3 mois",
                            "RecurringPaymentAllowed": false,
                            "Type": "VipPackage",
                            "VipCurrencyBonusPercentage": null
                        },
                        "Description": "27000 StarCoins, 195 Diamonds, 90 Jours VIP",
                        "ExpirationTime": "2024-11-02T20:06:46.0148605Z",
                        "GameProductId": "14030",
                        "Id": "7304918FR-FR-W-MSP2-14030",
                        "PricingStrategyName": null,
                        "PspProductIds": [],
                        "StandardCost": {
                            "Amount": 3799,
                            "Formatted": "37,99 €",
                            "Currency": "EUR"
                        },
                        "VipRestricted": null
                    },
                    {
                        "AutoRenewableSubscription": null,
                        "Benefits": [],
                        "Cost": {
                            "Amount": 3799,
                            "Formatted": "37,99 €",
                            "Currency": "EUR"
                        },
                        "CountryGeoLocated": "FR",
                        "Content": {
                            "BundledItems": [
                                {
                                    "Amount": 35000,
                                    "Description": "StarCoins",
                                    "ItemReference": "SoftCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 250,
                                    "Description": "Diamonds",
                                    "ItemReference": "HardCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 90,
                                    "Description": "Days of VIP access",
                                    "ItemReference": "DaysVip",
                                    "Variant": "3"
                                }
                            ],
                            "Id": "14040",
                            "Name": "Star VIP 3 mois",
                            "RecurringPaymentAllowed": false,
                            "Type": "VipPackage",
                            "VipCurrencyBonusPercentage": null
                        },
                        "Description": "35000 StarCoins, 250 Diamonds, 90 Jours VIP",
                        "ExpirationTime": "2024-11-02T20:06:46.0148605Z",
                        "GameProductId": "14040",
                        "Id": "7304918FR-FR-W-MSP2-14040",
                        "PricingStrategyName": null,
                        "PspProductIds": [],
                        "StandardCost": {
                            "Amount": 3799,
                            "Formatted": "37,99 €",
                            "Currency": "EUR"
                        },
                        "VipRestricted": null
                    },
                    {
                        "AutoRenewableSubscription": null,
                        "Benefits": [],
                        "Cost": {
                            "Amount": 6999,
                            "Formatted": "69,99 €",
                            "Currency": "EUR"
                        },
                        "CountryGeoLocated": "FR",
                        "Content": {
                            "BundledItems": [
                                {
                                    "Amount": 91000,
                                    "Description": "StarCoins",
                                    "ItemReference": "SoftCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 635,
                                    "Description": "Diamonds",
                                    "ItemReference": "HardCurrency",
                                    "Variant": null
                                },
                                {
                                    "Amount": 365,
                                    "Description": "Days of VIP access",
                                    "ItemReference": "DaysVip",
                                    "Variant": "2"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Tied with a Bow",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"22552595-fd8a-4095-b586-137d454243d6\",\"Snapshot\":\"msp2_poet_2023_shoesg_fj_preview\",\"CampaignPreviewGirl\":\"msp2_poet_2023_campaign_girl\",\"CampaignPreviewBoy\":\"msp2_poet_2023_campaign_boy\",\"Tags\":[\"TAG_FOOTWEAR\",\"TAG_GIRL\",\"TAG_FOOTWEAR_FLATSHOES\",\"TAG_CLOTHES\",\"TAG_VIP\",\"TAG_POETS_CLUB_CAMPAIGN_2023\"],\"NoCount\":false}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Platou of Tales",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"f4b462cd-b48d-4085-85c2-219b451ae6c5\",\"Snapshot\":\"msp2_poet_2023_shoesb_fj_preview\",\"CampaignPreviewGirl\":\"msp2_poet_2023_campaign_girl\",\"CampaignPreviewBoy\":\"msp2_poet_2023_campaign_boy\",\"Tags\":[\"TAG_FOOTWEAR\",\"TAG_BOY\",\"TAG_FOOTWEAR_FLATSHOES\",\"TAG_CLOTHES\",\"TAG_VIP\",\"TAG_POETS_CLUB_CAMPAIGN_2023\"],\"NoCount\":true}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Knowledge Container",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"7d84a6ea-4807-4907-9ce0-d34650cb65e3\",\"Snapshot\":\"msp2_poet_2023_hatb_fj_preview\",\"CampaignPreviewGirl\":\"msp2_poet_2023_campaign_girl\",\"CampaignPreviewBoy\":\"msp2_poet_2023_campaign_boy\",\"Tags\":[\"TAG_ACCESSORY\",\"TAG_BOY\",\"TAG_ACCESSORY_HEADWEAR\",\"TAG_CLOTHES\",\"TAG_VIP\",\"TAG_POETS_CLUB_CAMPAIGN_2023\"],\"NoCount\":true}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "A Poet's Attire",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"a49211fc-c7f7-4876-817f-95b4a0b157f5\",\"Snapshot\":\"msp2_poet_2023_topg_fj_preview\",\"CampaignPreviewGirl\":\"msp2_poet_2023_campaign_girl\",\"CampaignPreviewBoy\":\"msp2_poet_2023_campaign_boy\",\"Tags\":[\"TAG_GIRL\",\"TAG_DRESS\",\"TAG_DRESS_MINI\",\"TAG_DRESS_MISC\",\"TAG_CLOTHES\",\"TAG_VIP\",\"TAG_POETS_CLUB_CAMPAIGN_2023\"],\"NoCount\":false}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Layers of Poetry",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"07e8879a-222c-4811-ab8e-77c5110e93c0\",\"Snapshot\":\"msp2_poet_2023_topb_fj_preview\",\"CampaignPreviewGirl\":\"msp2_poet_2023_campaign_girl\",\"CampaignPreviewBoy\":\"msp2_poet_2023_campaign_boy\",\"Tags\":[\"TAG_TOPS\",\"TAG_BOY\",\"TAG_TOPS_MISC\",\"TAG_CLOTHES\",\"TAG_VIP\",\"TAG_POETS_CLUB_CAMPAIGN_2023\"],\"NoCount\":true}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Strands of Fate",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"11a6f818-572b-40cd-8e51-42eb07d85a05\",\"Snapshot\":\"msp2_poet_2023_hairg_fj_preview\",\"CampaignPreviewGirl\":\"msp2_poet_2023_campaign_girl\",\"CampaignPreviewBoy\":\"msp2_poet_2023_campaign_boy\",\"Tags\":[\"TAG_HAIR\",\"TAG_GIRL\",\"TAG_HAIR_LONG\",\"TAG_HAIR_STRAIGHT\",\"TAG_BEAUTY\",\"TAG_VIP\",\"TAG_POETS_CLUB_CAMPAIGN_2023\"],\"NoCount\":false}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Close Call",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"8f3c730f-d0de-40db-a641-399f09fed110\",\"Snapshot\":\"msp2_poet_2023_hairb_fj_preview\",\"CampaignPreviewGirl\":\"msp2_poet_2023_campaign_girl\",\"CampaignPreviewBoy\":\"msp2_poet_2023_campaign_boy\",\"Tags\":[\"TAG_HAIR\",\"TAG_BOY\",\"TAG_HAIR_BUZZ\",\"TAG_BEAUTY\",\"TAG_VIP\",\"TAG_POETS_CLUB_CAMPAIGN_2023\"],\"NoCount\":true}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Window to the Soul",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"10ca43df-3593-4f82-bc0e-0702fe4e8f3d\",\"Snapshot\":\"msp2_poet_2023_eyesg_fj_preview\",\"CampaignPreviewGirl\":\"msp2_poet_2023_campaign_girl\",\"CampaignPreviewBoy\":\"msp2_poet_2023_campaign_boy\",\"Tags\":[\"TAG_GIRL\",\"TAG_EYES\",\"TAG_BEAUTY\",\"TAG_VIP\",\"TAG_POETS_CLUB_CAMPAIGN_2023\"],\"NoCount\":false}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Window to the Soul",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"cc5e06c0-3931-45ca-b655-343982bfd323\",\"Snapshot\":\"msp2_poet_2023_eyesb_fj_preview\",\"CampaignPreviewGirl\":\"msp2_poet_2023_campaign_girl\",\"CampaignPreviewBoy\":\"msp2_poet_2023_campaign_boy\",\"Tags\":[\"TAG_BOY\",\"TAG_EYES\",\"TAG_BEAUTY\",\"TAG_VIP\",\"TAG_POETS_CLUB_CAMPAIGN_2023\"],\"NoCount\":true}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Fuzz",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"ff0e5b64-71fa-4be2-9114-d8edd6e27fb3\",\"Snapshot\":\"msp2_pet_poetsclub_2023_toypoodle_dg_preview\",\"CampaignPreviewGirl\":\"msp2_poet_2023_campaign_girl\",\"CampaignPreviewBoy\":\"msp2_poet_2023_campaign_boy\",\"Tags\":[\"TAG_VIP\",\"TAG_PET\",\"TAG_POETS_CLUB_CAMPAIGN_2023\"],\"NoCount\":false}"
                                }
                            ],
                            "Id": "42030",
                            "Name": "Elite VIP 1 an",
                            "RecurringPaymentAllowed": false,
                            "Type": "VipPackage",
                            "VipCurrencyBonusPercentage": null
                        },
                        "Description": "91000 StarCoins, 635 Diamonds, 365 Jours VIP",
                        "ExpirationTime": "2024-11-02T20:06:46.0148605Z",
                        "GameProductId": "42030",
                        "Id": "7304918FR-FR-W-MSP2-42010",
                        "PricingStrategyName": null,
                        "PspProductIds": [],
                        "StandardCost": {
                            "Amount": 6999,
                            "Formatted": "55,00 €",
                            "Currency": "EUR"
                        },
                        "VipRestricted": null
                    },
                    {
                        "AutoRenewableSubscription": false,
                        "Benefits": [
                            "generic_sale"
                        ],
                        "Cost": {
                            "Amount": 4199,
                            "Formatted": "41,99 €",
                            "Currency": "EUR"
                        },
                        "CountryGeoLocated": "FR",
                        "Content": {
                            "BundledItems": [
                                {
                                    "Amount": 1,
                                    "Description": "Elegant Sparkles",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_girltop_tk\",\"Snapshot\":\"msp2_wingcamp_2024_girltop_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_GIRL\"],\"NoCount\":false}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Relaxed Luxury",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_boytop_tk\",\"Snapshot\":\"msp2_wingcamp_2024_boytop_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_BOY\"],\"NoCount\":true}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "High-Class",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_girlhair_tk\",\"Snapshot\":\"msp2_wingcamp_2024_girlhair_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_GIRL\"],\"NoCount\":false}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Classic Elegance",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_boyhair_tk\",\"Snapshot\":\"msp2_wingcamp_2024_boyhair_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_BOY\"],\"NoCount\":true}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Grand Flowing",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_girlbot_tk\",\"Snapshot\":\"msp2_wingcamp_2024_girlbot_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_GIRL\"],\"NoCount\":false}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Handsome Flow",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_boybot_tk\",\"Snapshot\":\"msp2_wingcamp_2024_boybot_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_BOY\"],\"NoCount\":true}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Broken Wings",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_wingsg_tk\",\"Snapshot\":\"msp2_wingcamp_2024_wingsg_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_GIRL\"],\"NoCount\":false}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Broken Wings",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_wingsb_tk\",\"Snapshot\":\"msp2_wingcamp_2024_wingsb_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_BOY\"],\"NoCount\":true}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "A Wink of Elegance",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_eyesg_tk\",\"Snapshot\":\"msp2_wingcamp_2024_eyesg_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_GIRL\"],\"NoCount\":false}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "A Wink of Elegance",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_wingcamp_2024_eyesb_tk\",\"Snapshot\":\"msp2_wingcamp_2024_eyesb_tk_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_BOY\"],\"NoCount\":true}"
                                },
                                {
                                    "Amount": 1,
                                    "Description": "Vorki",
                                    "ItemReference": "curatedcontentitemtemplates_v2",
                                    "Variant": "{\"ObjectId\":\"msp2_pet_wingcamp_2024_dragon2_dg_prop\",\"Snapshot\":\"msp2_pet_wingcamp_2024_dragon2_dg_preview\",\"CampaignName\":\"msp2_wingcamp_2024\",\"Tags\":[\"TAG_PET\"],\"NoCount\":false}"
                                }
                            ],
                            "Id": "42002",
                            "Name": "Top-Up Diamant",
                            "RecurringPaymentAllowed": false,
                            "Type": "TopUp",
                            "VipCurrencyBonusPercentage": null
                        },
                        "Description": "New Years 2024 Items Only - Wingcamp",
                        "ExpirationTime": "2024-11-02T20:06:46.0148605Z",
                        "GameProductId": "42002-b",
                        "Id": "7304918FR-FR-W-MSP2-NEW-YEARS-2024-ITEMS-ONLY",
                        "PricingStrategyName": "generic_sale",
                        "PspProductIds": [],
                        "StandardCost": {
                            "Amount": 4199,
                            "Formatted": "41,99 €",
                            "Currency": "EUR"
                        },
                        "VipRestricted": true
                    }
                ]
            }),
        );
    }

    return originalFetch(url, options);
};
