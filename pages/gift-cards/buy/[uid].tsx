import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { CUstomSelect } from "components/common/CUstomSelect";
import ImageComponent from "components/common/ImageComponent";
import useTranslation from "next-translate/useTranslation";
import { BiTransferAlt } from "react-icons/bi";
import { BsGiftFill } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa";
import { HiOutlineRefresh } from "react-icons/hi";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import { useRouter } from "next/router";
import Error from "next/error";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import Footer from "components/common/footer";
import { GetServerSideProps } from "next";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import {
  getBuyPageDataApi,
  handleBuyCardApi,
  handleCoinsApi,
} from "service/gift-cards";
import PlaceBottomRight from "components/gradient/placeBottomRight";
import PlaceTopLeft from "components/gradient/placeTopLeft";
import TopLeftInnerPageCircle from "components/TopLeftInnerPageCircle";
import TopRightInnerPageCircle from "components/TopRightInnerPageCircle";
import StartTrending from "components/StartTrending";
import BottomLeftInnerPageCircle from "components/BottomLeftInnerPageCircle";
import BottomRigtInnerPageCircle from "components/BottomRigtInnerPageCircle";

export default function Index() {
  const { settings } = useSelector((state: RootState) => state.common);
  const router = useRouter();
  const [isSingle, setIsSingle] = useState(true);
  const [buyPageData, setBuyPageData] = useState<any>(null);
  const [selectCoin, setSelectCoin] = useState<any>({});
  const [availableCoin, setAvailableCoin] = useState(0);
  const [availableSpotWallet, setAvailableSpotWallet] = useState(0);
  const [availableP2PWallet, setAvailableP2PWallet] = useState(0);
  const [isError, setIsError] = useState(false);
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState("");
  const [isLock, setIsLock] = useState(false);
  const [note, setNote] = useState("");
  const [quantity, setQuantity] = useState(0);
  const { t } = useTranslation("common");
  const handleCoins = async (event: any) => {
    const data = await handleCoinsApi(event.coin_type);
    if (!data.success) {
      return;
    }
    setAvailableSpotWallet(data?.data?.exchange_wallet_balance);
    setAvailableP2PWallet(data?.data?.p2p_wallet_balance);
    setSelectCoin(event);
  };

  const buySingleOrBulkHandler = (value: string) => {
    if (value === "single") {
      setIsSingle(true);
      return;
    }
    setIsSingle(false);
  };

  useEffect(() => {
    if (router?.query?.uid) {
      getBuyPageData();
    }
  }, [router?.query?.uid]);

  const getBuyPageData = async () => {
    const data = await getBuyPageDataApi(router?.query?.uid);
    if (!data.success) {
      setIsError(true);
      return;
    }
    setBuyPageData(data.data);
    setIsError(false);
  };

  const handleAmount = (e: any) => {
    if (Number(e.target.value) > Number(availableCoin)) {
      toast.error(`Amount Can Not Be Greater Then ${availableCoin}`);
      return;
    }
    setAmount(e.target.value);
  };

  const handleBuyCard = async () => {
    if (!isSingle && quantity <= 0) {
      toast.error("Quantity is Requierd and Greater then 0");
      return;
    }

    let buyDetails: any = {
      coin_type: selectCoin?.coin_type,
      wallet_type: wallet === "spot" ? 1 : 2,
      amount: amount,
      note: note,
      banner_id: buyPageData?.selected_banner?.uid,
      lock: isLock ? 1 : 0,
      bulk: 0,
    };
    if (!isSingle) {
      buyDetails = {
        coin_type: selectCoin?.coin_type,
        wallet_type: wallet === "spot" ? 1 : 2,
        amount: amount,
        note: note,
        banner_id: buyPageData?.selected_banner?.uid,
        lock: isLock ? 1 : 0,
        bulk: 1,
        quantity: quantity,
      };
    }
    const data = await handleBuyCardApi(buyDetails);

    if (data.success) {
      router.push("/gift-cards/my-cards");
    } else {
      toast.error(data.message);
    }
  };

  if (isError) return <Error statusCode={404} />;
  return (
    <>
      <div className=" tradex-relative">
        <TopLeftInnerPageCircle />
        <TopRightInnerPageCircle />
        <div className=" tradex-container tradex-relative tradex-z-10 tradex-pt-[100px] ">
          <div className=" tradex-pb-4 tradex-border-b tradex-border-background-primary tradex-flex tradex-justify-between tradex-gap-6 tradex-flex-col md:tradex-flex-row md:tradex-items-center">
            <div className=" tradex-max-w-[592px] tradex-space-y-3">
              <h2 className=" tradex-text-[32px] tradex-leading-[38px] md:tradex-text-[40px] md:tradex-leading-[48px] tradex-font-bold !tradex-text-title">
                {buyPageData?.header || t("Buy & Sell Instantly And Hold")}
              </h2>
              <p className=" tradex-text-base tradex-leading-6 tradex-text-body">
                {buyPageData?.description ||
                  t(
                    "Tradexpro exchange is such a marketplace where people can trade directly with each other"
                  )}
              </p>
            </div>
            <div className=" tradex-flex tradex-flex-wrap tradex-items-center tradex-gap-6">
              <div className=" tradex-min-w-[150px] tradex-text-center tradex-flex tradex-flex-col tradex-space-y-2.5 tradex-items-center">
                <div className=" tradex-w-[60px] tradex-h-[60px] tradex-bg-primary tradex-rounded-full tradex-overflow-hidden tradex-flex tradex-justify-center tradex-items-center tradex-text-white">
                  {buyPageData?.feature_one_icon ? (
                    <img
                      className="tradex-max-w-[50px] tradex-max-h-[50px] tradex-object-cover tradex-object-center"
                      src={buyPageData.feature_one_icon}
                    />
                  ) : (
                    <RiCreativeCommonsZeroFill size={50} />
                  )}
                </div>
                <h4 className=" tradex-text-base tradex-leading-6 tradex-text-title">
                  {t(buyPageData?.feature_one || "Zero Fees")}
                </h4>
              </div>
              <div className=" tradex-min-w-[150px] tradex-text-center tradex-flex tradex-flex-col tradex-space-y-2.5 tradex-items-center">
                <div className="tradex-w-[60px] tradex-h-[60px] tradex-bg-primary tradex-rounded-full tradex-overflow-hidden tradex-flex tradex-justify-center tradex-items-center tradex-text-white">
                  {buyPageData?.feature_one_icon ? (
                    <img
                      className="tradex-max-w-[50px] tradex-max-h-[50px] tradex-object-cover tradex-object-center"
                      src={buyPageData.feature_two_icon}
                    />
                  ) : (
                    <RiCreativeCommonsZeroFill size={50} />
                  )}
                </div>
                <h4 className=" tradex-text-base tradex-leading-6 tradex-text-title">
                  {t(buyPageData?.feature_two || "270+ Tokens")}
                </h4>
              </div>
              <div className=" tradex-min-w-[150px] tradex-text-center tradex-flex tradex-flex-col tradex-space-y-2.5 tradex-items-center">
                <div className="tradex-w-[60px] tradex-h-[60px] tradex-bg-primary tradex-rounded-full tradex-overflow-hidden tradex-flex tradex-justify-center tradex-items-center tradex-text-white">
                  {buyPageData?.feature_one_icon ? (
                    <img
                      className="tradex-max-w-[50px] tradex-max-h-[50px] tradex-object-cover tradex-object-center"
                      src={buyPageData.feature_three_icon}
                    />
                  ) : (
                    <RiCreativeCommonsZeroFill size={50} />
                  )}
                </div>
                <h4 className=" tradex-text-base tradex-leading-6 tradex-text-title">
                  {t(buyPageData?.feature_three || "Instant Transfer")}
                </h4>
              </div>
            </div>
          </div>
          <div className=" tradex-pt-6">
            <div className=" tradex-flex tradex-gap-5">
              <h4
                className={`font-normal gift-card-inner-buy-tab pointer !tradex-text-title tradex-text-lg ${
                  isSingle && "gift-card-inner-buy-tab-active"
                }`}
                onClick={() => buySingleOrBulkHandler("single")}
              >
                {t("Buy 1 Card")}
              </h4>
              <div className="d-flex">
                <h4
                  className={`font-normal gift-card-inner-buy-tab pointer !tradex-text-title tradex-text-lg ${
                    !isSingle && "gift-card-inner-buy-tab-active"
                  } mr-2`}
                  onClick={() => buySingleOrBulkHandler("bulk")}
                >
                  {t("Bulk Create")}
                </h4>
                <div className="d-flex">
                  <span className="buy-triangle"></span>
                  <span className="buy-trinagle-btn tradex-text-white">
                    {t("Business")}
                  </span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-5">
                <div className="gift-card-banner-section-bottom-border">
                  <div className="relative">
                    <ImageComponent
                      src={
                        buyPageData?.selected_banner?.banner ||
                        "/demo_gift_banner.png"
                      }
                      height={300}
                    />{" "}
                    <div>
                      <div className="buy-absolute-btn tradex-flex tradex-gap-2.5 tradex-text-white tradex-items-center">
                        <BsGiftFill size={22} />
                        <h4 className=" !tradex-text-white">{`${
                          amount !== "" ? amount : 0
                        } ${selectCoin?.label || ""}`}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 mb-4">
                    <h3 className="mb-3">
                      {t(buyPageData?.selected_banner?.title)}
                    </h3>
                    <h5 className="font-normal">
                      {t(buyPageData?.selected_banner?.sub_title)}
                    </h5>
                  </div>
                </div>

                <div className="tradex-flex tradex-items-center tradex-my-4 tradex-gap-2.5 tradex-text-primary">
                  <span>
                    <BsGiftFill size={22} />
                  </span>
                  <h4 className="text-primary-color">{t("Gift Card Store")}</h4>
                </div>

                {/* al gift cards  start*/}
                <div className="row buy-all-gift-cards">
                  {buyPageData?.banners.map((item: any, index: number) => (
                    <div className="col-lg-4 col-md-4 col-6 my-1" key={index}>
                      <div
                        className={`${
                          router.query.uid == item.uid && "active-gift-card"
                        }`}
                      >
                        <Link href={`/gift-cards/buy/${item.uid}`}>
                          <a>
                            <ImageComponent
                              src={item.banner || "/demo_gift_banner.png"}
                              height={300}
                            />
                          </a>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                {/* al gift cards  start*/}
              </div>
              <div className="col-lg-7">
                <div>
                  <div className="col-lg-12">
                    <div className="form-group p2pSelectFilter">
                      <h6 className="gift-buy-input-label font-normal mb-3 border-bottom-dashed !tradex-text-title tradex-text-base">
                        {" "}
                        {t(`Buy`)}
                      </h6>
                      <CUstomSelect
                        options={buyPageData?.coins}
                        classname={"buy-amount-select-section"}
                        handleFunction={handleCoins}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group p2pSelectFilter">
                      <h6 className="gift-buy-input-label font-normal mb-3 border-bottom-dashed !tradex-text-title tradex-text-base">
                        {t(`Amount`)}
                      </h6>
                      <div className=" tradex-rounded tradex-flex tradex-bg-background-primary tradex-py-3">
                        <input
                          type="number"
                          placeholder="Enter Amount"
                          className="px-3 w-full bg-transparent border-none buy-border-right"
                          onChange={handleAmount}
                          value={amount}
                          disabled={availableCoin <= 0}
                        />
                        {/* <CUstomSelect
                        options={options}
                        classname={
                          "buy-amount-select-section buy-amount-select-section-width"
                        }
                      /> */}
                        <span className="buy-amount-select-section-width pl-3">
                          {selectCoin?.label || ""}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group p2pSelectFilter">
                      <div className="mb-3 d-flex justify-content-between">
                        <div className="d-flex align-items-center gap-20">
                          <h6 className="gift-buy-input-label font-normal  border-bottom-dashed !tradex-text-title tradex-text-base">
                            {t("Available")}
                          </h6>
                          <div className="text-primary-color">
                            <h6 className="gift-buy-input-label mr-2">
                              {t(
                                `${Number(availableCoin)} ${
                                  selectCoin?.label || ""
                                }`
                              )}
                            </h6>
                          </div>
                        </div>
                      </div>

                      <div className="buy-input-bg p-3 rounded buy-checkbox">
                        <div className="d-flex gap-20">
                          <input
                            type="checkbox"
                            onChange={() => {
                              setWallet("spot");
                              setAvailableCoin(availableSpotWallet);
                            }}
                            checked={wallet === "spot"}
                            className="checkbox-w-25"
                          />
                          <div className="d-flex justify-content-between w-full">
                            <h6 className="font-normal"> {t(`Spot Wallet`)}</h6>
                            <h6 className="font-normal">
                              {" "}
                              {t(
                                `${availableSpotWallet} ${
                                  selectCoin?.label || ""
                                }`
                              )}
                            </h6>
                          </div>
                        </div>
                        {parseInt(settings?.p2p_module) === 1 && (
                          <div className="d-flex gap-20 mt-3">
                            <input
                              type="checkbox"
                              onChange={() => {
                                setWallet("p2p");
                                setAvailableCoin(availableP2PWallet);
                              }}
                              checked={wallet === "p2p"}
                              className="checkbox-w-25"
                            />
                            <div className="d-flex justify-content-between w-full">
                              <h6 className="font-normal">
                                {" "}
                                {t(`P2P Wallet`)}
                              </h6>
                              <h6 className="font-normal">
                                {t(
                                  `${availableP2PWallet} ${
                                    selectCoin?.label || ""
                                  }`
                                )}
                              </h6>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/*quantity for bulk upload only start */}
                  {!isSingle && (
                    <div className="col-lg-12">
                      <div className="form-group p2pSelectFilter">
                        <h6 className="gift-buy-input-label font-normal mb-3 border-bottom-dashed !tradex-text-title tradex-text-base">
                          {t(`Quantity`)}
                        </h6>
                        <div className="tradex-rounded tradex-flex tradex-bg-background-primary tradex-py-3">
                          <input
                            type="number"
                            min={1}
                            placeholder="Enter Quantity"
                            className="px-3 w-full bg-transparent border-none buy-border-right"
                            onChange={(e) =>
                              setQuantity(Number(e.target.value))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/*quantity for bulk upload only end */}

                  <div className="col-lg-12">
                    <div className="form-group p2pSelectFilter">
                      <h6 className="gift-buy-input-label font-normal mb-3 !tradex-text-title tradex-text-base">
                        {t(`Note (Optional)`)}
                      </h6>
                      <div className="d-flex buy-input-bg py-2 rounded">
                        <textarea
                          placeholder="Enter note for this order"
                          className="px-3 w-full bg-transparent border-none"
                          rows={4}
                          value={note}
                          onChange={(event) => setNote(event.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-4">
                    <div className="form-group p2pSelectFilter">
                      <div className=" d-flex align-items-center gap-10">
                        <h6 className="gift-buy-input-label font-normal  border-bottom-dashed !tradex-text-title tradex-text-base">
                          {t(`Lock`)}
                        </h6>

                        <label className="gift-card-buy-switch mb-0">
                          <input
                            type="checkbox"
                            onChange={() => setIsLock((prev) => !prev)}
                            checked={isLock}
                          />
                          <span className="gift-card-buy-slider gift-card-buy"></span>
                        </label>
                      </div>

                      <div>
                        <small>
                          {isSingle
                            ? t(
                                `If you chose to lock the gift cards, it will not be redeemable nor addable by others until you unlock it`
                              )
                            : t(
                                `If you chose to bulk lock the gift cards, they will not be redeemable nor addable by others until you unlock them`
                              )}
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-8">
                        <div className="row mb-2">
                          <div className="col-lg-5 col-md-5 col-6">
                            <p className="font-normal">{t(`Fees`)}</p>
                          </div>
                          <div className="col-lg-7 col-md-7 col-6">
                            <p className="font-normal">0</p>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-5 col-md-5 col-6">
                            <h5 className="!tradex-text-title tradex-text-lg">
                              {t(`Total Amount`)}
                            </h5>
                          </div>
                          <div className="col-lg-7 col-md-7 col-6">
                            <h5 className="!tradex-text-title tradex-text-lg">{`${
                              amount !== ""
                                ? isSingle
                                  ? amount
                                  : Number(amount) * Number(quantity)
                                : 0
                            } ${selectCoin?.label || ""}`}</h5>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 ">
                        <button
                          className={`h-full w-full border-none d-flex justify-content-center align-items-center rounded tradex-bg-background-main ${
                            amount !== "" && wallet !== ""
                              ? "text-white bg-primary-color"
                              : "cursor-not-allowed"
                          }`}
                          disabled={
                            amount !== "" && wallet !== "" ? false : true
                          }
                          onClick={handleBuyCard}
                        >
                          {t(`Buy`)}
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* only for single buy start */}
                  {isSingle && (
                    <div
                      className="col-lg-12 my-4 text-primary-color pointer"
                      onClick={() => buySingleOrBulkHandler("bulk")}
                    >
                      <div className="d-flex align-items-center">
                        <h5 className="font-normal text-primary-color inline-block">
                          <u>{t(`Buy multiple gift cards`)}</u>{" "}
                        </h5>
                        <span>
                          <FaAngleRight size={15} />
                        </span>
                      </div>
                    </div>
                  )}

                  {/* only for single buy start */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <StartTrending />
        <BottomLeftInnerPageCircle />
        <BottomRigtInnerPageCircle />
      </div>
      <Footer />
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/gift-cards");

  return {
    props: {},
  };
};
